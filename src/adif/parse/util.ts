import {tutad} from "../../util.ts";
import {type Data, type Type} from "../type.ts";
import {type F, type B, TypeError} from "./index.ts";

/**
 * Implement block (`b`) parsing with a flow (`f`) parser for single-line blocks.
 *
 * @typeParam T - The ADIF type parsed by the flow (thus block) parser
 * @typeParam U - The rest parameter of the flow (thus block) parser
 *
 * @param f - The flow parser to use in the implementation
 */
export function b_f<T extends Type, U extends unknown[]>(f: FlowParser<T, U>) {
    return function (input: B, type: T, ...args: U) {
        if (input.length === 1) return f(input[0], type, ...args);
        throw new TypeError(input, type);
    };
}

/**
 * Build a complete parser for an ADIF data type from its flow (`f`) and block
 * (`b`) parser implementation.
 *
 * @typeParam T - The ADIF type parsed by the flow/block parsers
 * @typeParam U - The rest parameter of the flow/block parsers
 *
 * @param f - The flow parser to use in the implementation
 * @param b - The block parser to use in the implementation
 */
export function parser<T extends Type, U extends unknown[]>(
    f: FlowParser<T, U>,
    b: BlockParser<T, U>
) {
    return function (input: F | B, type: T, ...args: U) {
        return tutad(f, b, input, type, ...args);
    };
}

type FlowParser<T extends Type, U extends unknown[]> = (
    input: F,
    type: T,
    ...args: U
) => Data;
type BlockParser<T extends Type, U extends unknown[]> = (
    input: B,
    type: T,
    ...args: U
) => Data;
