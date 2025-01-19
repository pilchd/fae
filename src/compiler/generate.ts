import {render} from "../adif.ts";
import {ADIF, IR} from "./tree.ts";

/**
 * Options for the generator
 */
export interface Options {
    /**
     * Specify the separator for data-specifiers
     */
    separator: string;
}

/**
 * Render ADI from `IR`.
 *
 * @param ir - The `IR` to generate from
 *
 * @return The ADI for `map`
 */
export default function generate(ir: IR, {separator}: Options): ADIF {
    return [
        render("header", ir.header, separator),
        ...ir.records.map(record => render("qso", record, separator))
    ];
}
