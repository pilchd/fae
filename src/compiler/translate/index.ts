import {
    type Field,
    TypeError,
    enumeration,
    field,
    parse,
    sparse,
    type
} from "../../adif/index.ts";
import {type ST, st_g} from "../../ST.ts";
import {type OrArray, clump, si} from "../../util.ts";
import * as AST from "../AST.ts";
import {CompilerError} from "../error.ts";
import * as ie from "./inference.ts";
import * as pp from "./pp.ts";
import * as vd from "./validate.ts";

/**
 * Translate the `Record`(s) in a `Statement` by resolving declarations,
 * applying factors, and expanding field lists.
 *
 * @param statement - The `factor` or `record` to distribute
 * @param inferences - Inferences to apply on unnamed field data
 * @param pps - Post-processors to apply on unnamed field data
 * @param validators - Validators to apply on the field lists of records
 * @param ST - The declarations referenced by `statement`
 * @param binder - The `Binder` for the parent field list to `statement`
 */
export function distribute(
    statement: AST.Statement,
    {
        inferences = [],
        pps = [],
        validators = []
    }: {
        inferences?: ie.Inference[];
        pps?: pp.PP[];
        validators?: vd.Validator[];
    } = {},
    ST: ST<AST.Symbol, AST.AliasDeclaration> = [],
    binder: Binder = {bound: new Map(), stack: new Array()}
): Field[][] {
    const declarations = [new Map<AST.Symbol, AST.AliasDeclaration>(), ...ST];

    switch (statement.node) {
        case "record": {
            const fl = dealias(statement.fl, declarations);

            return [
                validate(
                    finalize(bind(...infer(binder, fl, inferences))),
                    pps,
                    validators
                )
            ];
        }

        case "factor": {
            statement.factors
                .filter(factor => factor.node === "declaration")
                .forEach(declaration =>
                    declarations[0].set(declaration.symbol, declaration)
                );
            const fl = dealias(
                statement.factors.filter(
                    factor => factor.node !== "declaration"
                ),
                declarations
            );

            return statement.statements.flatMap(child =>
                distribute(
                    child,
                    {inferences, pps, validators},
                    declarations,
                    bind(...infer(binder, fl, inferences))
                )
            );
        }
    }
}

/**
 * Expand the aliases in a (partially-bound) field list.
 *
 * This function is associative; non-affected FL elements are returned.
 *
 * @param fl The field list to expand
 * @param st The declarations referenced by `fl`
 */
function dealias(
    fl: AST.Fle[],
    st: ST<AST.Symbol, AST.AliasDeclaration>
): Exclude<AST.Fle, AST.Alias>[] {
    return fl.flatMap(node => {
        switch (node.node) {
            default:
                return node;

            case "alias":
                const declaration = st_g(st, node.symbol);
                if (!declaration) throw e_integrity();

                return dealias(declaration.fl, st);
        }
    });
}

/** A container holding state for a partial bind of a field list */
type Binder = {
    /** Field names keying their position (`null`) or their data bind (`Bind`) */
    bound: Map<field.Name_Q, null | Bind>;
    /** Names remaining on the name stack after this partial bind */
    stack: AST.Name[];
};
/** A field name bound to its type and data */
interface Bind {
    name: {
        /** The bounded field's name */
        val: field.Name_Q;
        /** The bounded field's name's location */
        locator?: AST.Range;
    };
    /** The bounded field's type */
    type: type.Type;
    data: {
        /** The bounded field's data */
        val: type.Data;
        /** The bounded field's data's location */
        locator?: AST.Range;
    };
}

/**
 * Infer `Bind`s for a partially-bound field list from `Data` nodes at
 * positions with an empty name stack.
 *
 * Visited names will have their positions in `binder` mapped to `null`.
 *
 * @param binder The `Binder` to infer into
 * @param inferences The ordered inferences to apply on data in `fl`
 */
function infer(
    binder: Binder,
    fl: ReturnType<typeof dealias>,
    inferences: ie.Inference[] = []
): [Binder, ReturnType<typeof dealias>] {
    const [bound, stack] = [new Map(binder.bound), Array.from(binder.stack)];

    let height = stack.length;
    const exe = new Set();

    fl = fl.filter(node => {
        switch (node.node) {
            case "pop":
                if (height > 0) --height;
            case "nop":
                return true;

            case "name":
                ++height;
                if (!bound.has(node.name)) bound.set(node.name, null);
                return true;

            case "data":
                if (height > 0) {
                    --height;
                    return true;
                }

                const [name] =
                    inferences.find(([name, predicate = () => true], idx) => {
                        if (exe.has(idx)) return;

                        if (
                            predicate(node.data) &&
                            sparse(node.data, field.name_type[name]).ok
                        ) {
                            exe.add(idx);
                            return true;
                        }
                    }) ?? [];
                if (!name) throw e_infer(node);

                bound.set(name, {
                    name: {
                        val: name
                    },
                    type: field.name_type[name],
                    data: {
                        val: parse(node.data, field.name_type[name]),
                        locator: node.locator
                    }
                });
        }
    });

    return [{bound, stack}, fl];
}
/**
 * Generate a partially-bound field list from the dealiased field list `fl`.
 *
 * A partially-bound field list contains the maximum number of `Bind` elements
 * with their constituents removed. Unbindable elements are preserved in order.
 *
 * @param fl - The dealiased field list to bind
 * @param fields - The user-defined fields at the location of the field list
 */
function bind(binder: Binder, fl: ReturnType<typeof dealias>): Binder {
    const [bound, stack] = [new Map(binder.bound), Array.from(binder.stack)];

    for (const node of clump(
        fl,
        element => "node" in element && element.node === "name"
    )) {
        // AST.Name (clump)
        if (Array.isArray(node)) {
            for (const name of node)
                if (!bound.has(name.name)) bound.set(name.name, null);
            stack.unshift(...node);

            continue;
        }

        switch (node.node) {
            case "pop":
                stack.shift();
            case "nop":
                continue;

            case "data":
                const name = stack.shift();
                if (!name) throw e_unname(node);
                const type =
                    "type" in name ? name.type : field.name_type[name.name];

                try {
                    bound.set(name.name, {
                        name: {
                            val: name.name,
                            locator: name.locator
                        },
                        type,
                        data: {
                            val: parse(node.data, type),
                            locator: node.locator
                        }
                    });
                } catch (e) {
                    if (e instanceof TypeError) {
                        throw new CompilerError({
                            message: e.message, // + " in " + name.name,
                            type: "type",
                            locator: si(name.locator, node.locator),
                            hint: e.hint
                        });
                    }

                    throw e;
                }
        }
    }

    return {bound, stack};
}

/**
 * Remove unbound elements from `binder` and generate its array of binds.
 *
 * @param binder - The `Binder` to finalize
 */
function finalize(binder: Binder): Bind[] {
    return binder.bound
        .values()
        .filter(value => !!value)
        .toArray();
}

/**
 * Apply post-processors to a finalized field list, execute dependent
 * and user-supplied validators, and generate a minimal, correct field list.
 *
 * @param binds - The finalized binds to post-process
 * @param pps - The ordered post-processors to apply on names in `binds`
 * @param vds - The ordered validators to apply to this record
 */
function validate(
    binds: ReturnType<typeof finalize>,
    pps: pp.PP[],
    vds: vd.Validator[]
): Field[] {
    pps = [
        ...pps,
        //"CNTY":,
        //"MY_CNTY":,
        //"MY_STATE":,
        //"STATE":,
        pp.infer("SUBMODE", "MODE", enumeration.Submode)
    ];

    binds = binds.flatMap(bind => [
        bind,
        ...pps
            .filter(([name]) => bind.name.val === name)
            .map(([, pp]) => {
                const [name, data] = pp(bind.data.val) ?? [];

                if (name && data)
                    return {
                        name: {val: name},
                        type: field.name_type[name],
                        data: {val: data}
                    };
            })
            .filter(value => !!value)
    ]);

    binds.forEach(bind_d => {
        if ("dependent" in bind_d.type) {
            const name_i = bind_d.type.dependent;

            const bind_i = binds.findLast(value => name_i === value.name.val);
            if (!bind_i) throw e_integrity();

            const test = sparse(bind_d.data.val, bind_d.type, bind_i.data.val);
            if (!test.ok) throw e_dependent(bind_i, bind_d, test.error);
        }
    });

    const fl = binds.map<Field>(bind => [bind.name.val, bind.data.val]);
    vds.forEach(validator => {
        const result = validator(fl);
        if (result) throw e_validation(binds, result);
    });

    return fl;
}

const e_infer = (node: AST.Node) =>
    new CompilerError({
        message: "no inferences matched",
        type: "data",
        locator: node.locator,
        hint: "Did you misspell a field name or enable an applicable inference?"
    });
const e_unname = (node: AST.Node) => {
    throw new CompilerError({
        message: "empty name stack",
        type: "semantic",
        locator: node.locator,
        hint: "Did you specify a type or enable an applicable inference?"
    });
};
const e_dependent = (bind_i: Bind, bind_d: Bind, error: TypeError) =>
    new CompilerError({
        message: `dependent data ${bind_d.data.val} incompatible with independent data ${bind_i.data.val}`,
        type: "validation",
        locator: si(bind_i.data.locator, bind_d.data.locator),
        hint: error.hint
    });
const e_validation = (binds: Bind[], hint: string) =>
    new CompilerError({
        message: `invalid record`,
        type: "validation",
        locator: binds.flatMap(bind =>
            si(bind.name.locator, bind.data.locator)
        ),
        hint: hint
    });

const e_integrity = (node?: OrArray<AST.Node>) =>
    new CompilerError({
        message: "AST integrity check failed",
        type: "integrity",
        locator:
            node &&
            [node]
                .flat()
                .filter(node => node?.locator)
                .map(node => node.locator!),
        hint: "The compiler fell apart :( Please open an issue!"
    });
