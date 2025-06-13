import {type Field, createdAt, field, render, udf} from "../adif/index.ts";
import * as g from "../constant.ts";
import {distribute} from "./translate/index.ts";
import {type Inference} from "./translate/inference.ts";
import {type PP} from "./translate/pp.ts";
import {type Validator} from "./translate/validate.ts";
import * as AST from "./AST.ts";
import {CompilerError} from "./error.ts";
import * as parser from "./parser.js";

/**
 * Parse FAE input to its AST.
 *
 * @param input - The FAE input to parse
 * @param options - Additional configuration for the parser
 */
export function parse(input: string, {debug = false}: ParseOptions = {}) {
    try {
        return parser.parse(input, {
            debug
        }) as AST.AST;
    } catch (e) {
        if (e instanceof parser.SyntaxError)
            throw new CompilerError({
                message: e.message,
                type: "parse",
                locator: {
                    start: e.location.start.offset,
                    end: e.location.end.offset
                }
            });

        throw e;
    }
}
export interface ParseOptions {
    debug?: boolean;
}

/**
 * Translate an `AST` to intermediate representation.
 *
 * @param ast - The `AST` to translate
 * @param pps - A `Record` of pre-processors to execute on `Field` arrays
 */
export function translate(
    ast: AST.AST,
    {inferences = [], pps = [], validators = []}: TranslateOptions = {}
): {
    header: Field<field.Name_H>[];
    records: Field<field.Name_Q<string>>[][];
} {
    return {
        header: [
            ["ADIF_VER", g.ADIF_VER],
            ["PROGRAMID", g.PROGRAMID],
            ["PROGRAMVERSION", g.PROGRAMVERSION],
            createdAt(),
            ...ast.fields.map(([name, type], idx) => udf(idx, name, type))
        ],
        records: ast.statements.flatMap(statement =>
            distribute(statement, {inferences, pps, validators})
        )
    };
}
export interface TranslateOptions {
    inferences?: Inference[];
    pps?: PP[];
    validators?: Validator[];
}

/**
 * Render ADIF from intermediate representation.
 *
 * @param ir - The intermediate representation to render from
 */
export function generate(
    ir: {
        header: Field<field.Name_H>[];
        records: Field<field.Name_Q<string>>[][];
    },
    {separator = " "}: GenerateOptions = {}
) {
    return [
        render("header", ir.header, " "),
        ...ir.records.map(record => render("qso", record, separator))
    ];
}
export interface GenerateOptions {
    /** The ADI data-specifier separator */
    separator?: string;
}

export {CompilerError} from "./error.ts";
export * as inference from "./translate/inference.ts";
export * as pp from "./translate/pp.ts";
export * as validate from "./translate/validate.ts";
