import {printnon} from "../../util.ts";
import * as type from "../type.ts";

import Boolean from "./Boolean.ts";
import Integer from "./Integer.ts";
import Number from "./Number.ts";
import Date from "./Date.ts";
import Time from "./Time.ts";
import String from "./String.ts";
import MultilineString from "./MultilineString.ts";
import Enumeration from "./Enumeration.ts";
import GridSquare from "./GridSquare.ts";
import POTARefList from "./POTARefList.ts";

/**
 * Parse correct data for an ADIF data type from flow or block input.
 *
 * @param data The flow or block input to parse
 * @param type The ADIF type to parse from the data
 * @param dependent If applicable, correct data for this type's independent field
 *
 * @throws {@link TypeError}
 * The data failed to parse
 */
export function parse(
    data: F | B,
    type: type.Type,
    dependent?: type.Data
): type.Data {
    switch (type.name) {
        case "Boolean":
            return Boolean(data, type);
        case "Integer":
            return Integer(data, type);
        case "Number":
            return Number(data, type);
        case "Date":
            return Date(data, type);
        case "Time":
            return Time(data, type);
        case "String":
            return String(data, type);
        case "MultilineString":
            return MultilineString(data, type);
        case "Enumeration":
            return Enumeration(data, type, dependent);
        case "GridSquare":
            return GridSquare(data, type);
        case "POTARefList":
            return POTARefList(data, type);
        default:
            throw new Error("unsupported type");
    }
}
/**
 * *"safe parse"*
 *
 * Parse correct data for an ADIF data type from flow or block input.
 *
 * @see {@link parse}
 */
export function sparse(
    data: F | B,
    type: type.Type,
    dependent?: type.Data
): {ok: true; data: type.Data} | {ok: false; error: TypeError} {
    try {
        return {
            ok: true,
            data: parse(data, type, dependent)
        };
    } catch (e) {
        if (e instanceof TypeError)
            return {
                ok: false,
                error: e
            };

        throw e;
    }
}

/** Flow format */
export type F = string;
/** Block format */
export type B = string[];

export class TypeError extends Error {
    constructor(
        public data: F | B,
        public type: type.Type,
        public hint?: string
    ) {
        super(
            printnon(
                !Array.isArray(data)
                    ? `flow data '${data}' is not compatible with type ${type.name}`
                    : `block data '${data.join("', '")}' is not compatible with type ${type.name}`
            )
        );

        this.name = "TypeError";
    }
}
