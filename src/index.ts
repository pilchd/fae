import parse, {type Options as ParseOptions} from "./compiler/parse.ts";
import translate, {type Options as TranslateOptions} from "./compiler/translate.ts";
import generate, {type Options as GenerateOptions} from "./compiler/generate.ts";
import type {IR, ADIF} from "./compiler/tree.ts";

import {FREQ__inferBand} from "./compiler/pps.ts";
import type {DeepPartial} from "./util.ts";

/**
 * Options for the compiler
 */
export interface Options {
    parse: ParseOptions;
    translate: TranslateOptions;
    generate: GenerateOptions;
}
const defaults: Options = {
    parse: {
        name: "input",
        debug: false
    },
    translate: {
        pps: {
            FREQ: FREQ__inferBand
        },
        required: ["QSO_DATE", "MODE", "TIME_ON", "BAND"]
    },
    generate: {
        separator: " "
    }
};

/**
 * Compile FAE to ADIF, but stop the compilation after translation (compile to IR).
 *
 * @param input - The FAE content to translate
 * @param options - Options for the parser and the translator
 *
 * @throws `SyntaxError`
 * An error occurred in the parser
 * @throws `ValidationError
 * An error occurred in the translator
 */
export function ir(
    input: string,
    options?: DeepPartial<Pick<Options, "parse" | "translate">>
): IR {
    const o: Options = Object.assign({}, defaults, options);

    return translate(parse(input, o.parse), o.translate);
}
/**
 * Compile FAE to ADIF.
 *
 * @param input - The FAE content to compile
 * @param options - Options for the parser, translator, and generator
 *
 * @throws `SyntaxError`
 * An error occurred in the parser
 * @throws `ValidationError`
 * An error occurred in the translator
 */
export function compile(
    input: string,
    options?: DeepPartial<Options>
): ADIF {
    const o: Options = Object.assign({}, defaults, options);

    return generate(translate(parse(input, o.parse), o.translate), o.generate);
}

export {SyntaxError} from "./compiler/parse.ts";
export {ValidationError} from "./compiler/translate.ts";
export {IR, ADIF};
