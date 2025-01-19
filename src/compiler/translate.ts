import {type HeaderField, type QSOField} from "../adif.ts";
import * as g from "../constant.ts";
import type {
    AST,
    Field,
    IR,
    Location,
    Record as R,
    Statement,
    Type
} from "./tree.ts";

export type PP = (data: string) => Field<QSOField>[];

/**
 * Options for the translator
 */
export interface Options {
    /**
     * Attach pre-processors to execute across field lists before translation
     */
    pps: Partial<Record<QSOField, PP>>;
    /**
     * Generate a warning for each record that doesn't contain these fields
     */
    required: QSOField[];
}

/**
 * Translate an `AST` to its `IR`.
 *
 * @param ast - The `AST` to translate
 * @param pps - A `Record` of pre-processors to execute on `Field` arraus
 *
 * @return The `IR` for this `AST`
 */
export default function translate(ast: AST, {pps, required}: Options): IR {
    return {
        header: [
            ["ADIF_VER", g.ADIF_VER],
            ["CREATED_TIMESTAMP", createdTimestamp()],
            ["PROGRAMID", g.PROGRAMID],
            ["PROGRAMVERSION", g.PROGRAMVERSION],
            ...ast.declarations
                .entries()
                .map((declaration, index) =>
                    translateDeclaration(declaration, index)
                )
        ],
        records: ast.statements
            .map(statement => distribute(statement))
            .flat()
            .map(record => pp(record, pps))
            .map(record => validate(record, required))
            .map(record => record.fields)
    };
}

/**
 * Generate the present value for the ADIF header field `CREATED_TIMESTAMP`.
 *
 * @return A value compatible with `CREATED_TIMESTAMP`
 */
function createdTimestamp() {
    const now = new Date();
    const time = {
        yyyy: now.getUTCFullYear().toString().padStart(4, "0"),
        mm: (now.getUTCMonth() + 1).toString().padStart(2, "0"),
        dd: now.getUTCDate().toString().padStart(2, "0"),
        HH: now.getUTCHours().toString().padStart(2, "0"),
        MM: now.getUTCMinutes().toString().padStart(2, "0"),
        SS: now.getUTCSeconds().toString().padStart(2, "0")
    };
    return `${time.yyyy}${time.mm}${time.dd} ${time.HH}${time.MM}${time.SS}`;
}
/**
 * Translate a user-defined field declaration to its ADIF header field `USERDEF`.
 *
 * @param declaration - The declaration to transalate (the field name and its type)
 * @param index - The index number to associate with the `USERDEF`
 *
 * @return The data for this declaration's `USERDEF` field
 */
function translateDeclaration(
    declaration: [name: string, type: Type],
    index: number
): Field<HeaderField> {
    let enumeration_range = "";
    switch (declaration[1].indicator) {
        case "E":
            const enumeration = declaration[1].enumeration;
            if (enumeration) enumeration_range = `,{${enumeration.join(",")}}`;
            break;
        case "N":
            const range = declaration[1].range;
            if (range) enumeration_range = `,{${range[0]}:${range[1]}}`;
            break;
    }
    return [
        `USERDEF${index + 1}`,
        `${declaration[0]}${enumeration_range}`,
        declaration[1].indicator
    ];
}
/**
 * Generate `Record`s from `Statement`s by applying factors.
 *
 * @param statement - The statement to distribute:
 *   - if `Factor`, `fields` and its fields are prepended to its statements,
 *   and the resultant records are returned
 *   - if `Record`, `fields` are prepended to its fields, and the resultant
 *   record is wrapped and returned
 * @param fields - Additional fields to prepend to records
 *
 * @return All of the `Record`s contained in `Statement` prepended with the
 * fields from all of their `Factor`s
 */
function distribute(statement: Statement, fields: Field<QSOField>[] = []): R[] {
    switch (statement.type) {
        case "record":
            statement.fields = [...fields, ...statement.fields];
            return [statement];
        case "factor":
            return statement.statements
                .map(child =>
                    distribute(child, [...fields, ...statement.fields])
                )
                .flat();
    }
}
/**
 * Apply a `Map` of pre-processors to the `Field` array of a record.
 *
 * A pre-processor may be registered to the name of a single ADIF field by
 * setting the corresponding key in `pps`. Each time that ADIF field appears
 * in `fields`, its value is passed to the function set in `pps`. The field
 * pairs returned by the function *replace* the original field tuple.
 *
 * @param record - The record whose fields to apply over
 * @param pps - The `Map` of pre-processors to apply
 *
 * @return The result of applying all pre-processors over all fields
 */
export function pp(record: R, pps: Partial<Record<QSOField, PP>>): R {
    return {
        ...record,
        fields: record.fields.reduce<Field<QSOField>[]>(
            (accumulator, currentValue) => {
                const pp = pps[currentValue[0]];
                return pp
                    ? accumulator.concat(pp(currentValue[1]))
                    : accumulator.concat([currentValue]);
            },
            []
        )
    };
}
/**
 * Validate a record.
 *
 * @param record - The record to validate
 * @param required - Fields to require in this record
 *
 * @return The record
 */
function validate(record: R, required: QSOField[]) {
    if (required.length > 0) {
        const miss = required.filter(
            field => !record.fields.map(([field]) => field).includes(field)
        );
        if (miss.length > 0) {
            const s = miss.length > 1 ? "s" : "";
            throw new ValidationError(
                `Record does not contain required field${s} ${miss.join(", ")} at ${record.location.start.line}`,
                record.location
            );
        }
    }

    return record;
}

/**
 * Errors thrown by the validator extend this class.
 */
export class ValidationError extends Error {
    constructor(message: string, location: Location) {
        super(message);
        this.location = location;
    }
    location: Location;
}
