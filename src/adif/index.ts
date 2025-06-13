import * as enumeration from "./enumeration.ts";
import * as field from "./field.ts";
import * as type from "./type.ts";

/** A container representing a complete ADIF field. */
export type Field<T extends field.Name = field.Name> = [
    /** The ADIF field name */
    name: T,
    /** The field data */
    data: type.Data,
    /** The data type indicator */
    indicator?: type.Indicator
];

/**
 * Render a field list to an ADI-compatible string.
 *
 * @example
 * Render some header fields including data specifiers:
 *
 * ```ts
 * const fields = [
 *     ["ADIF_VER", "1.0.0"],
 *     ["USERDEF1", "SweaterSize,{S,M,L}", "E"],
 *     ["USERDEF2", "ShoeSize,{5:20}", "N"]
 * ]
 * render("header", fields) === "<ADIF_VER:5>1.0.0 <USERDEF1:19:E>SweaterSize,{S,M,L} <USERDEF2:15:N>ShoeSize,{5:20} <EOH>"
 * ```
 *
 * @example
 * Render some QSO fields with the default separator:
 *
 * ```ts
 * const fields = [
 *     ["BAND", "20m"],
 *     ["MODE", "SSB"]
 * ]
 * render("qso", fields) === "<BAND:3>20m <MODE:3>SSB <EOR>"
 * ```
 *
 * @typeParam T - This field list contains `"header" `or `"qso"` fields
 *
 * @param type - The type of fields in `fields`
 * @param fields - The fields to render
 * @param separator - The separator to join fields with
 */
export function render<T extends "header" | "qso">(
    type: T,
    fields: Field<
        T extends "header" ? field.Name_H : field.Name_Q<field.Name_U>
    >[],
    separator = " "
): string {
    return [
        ...new Map(
            fields.map(([name, ...data_indicator]) => [name, data_indicator])
        )
    ]
        .map(
            ([name, [data, indicator]]) =>
                `<${name}:${data.length}${indicator ? `:${indicator}` : ""}>${data}`
        )
        .concat([`<EO${type === "header" ? "H" : "R"}>`])
        .join(separator);
}

/**
 * Render the ADI header content for a user-defined field.
 *
 * @param n - The document index of this user-defined field
 * @param f_name - This user-defined field's name
 * @param f_type - The data type of this user-defined field
 */
export function udf(
    n: number,
    f_name: field.Name_U,
    f_type: type.Indicated
): Field<field.Name_H> {
    if ("dependent" in f_type)
        throw new Error("user-defined fields cannot be dependent");

    const name = `USERDEF${n}` as const;
    let data = f_name;

    if (f_type.name === "Enumeration")
        data += `,{${[...f_type.enumeration].join(",")}}`;
    if (f_type.name === "Number" && f_type.range)
        data += `,{${f_type.range[0]}:${f_type.range[1]}}`;

    return [name, data, type.ii(f_type)];
}

/**
 * Generate the present `Field` for `CREATED_TIMESTAMP`.
 */
export function createdAt(): ["CREATED_TIMESTAMP", type.Data, "S"] {
    return [
        "CREATED_TIMESTAMP",
        new Date()
            .toISOString()
            .replace(/[-.:TZ]/g, "")
            .slice(0, 14),
        "S"
    ];
}

export {enumeration, field, type};

export {TypeError, parse, sparse} from "./parse/index.ts";
