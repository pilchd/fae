import {
    type ParseOptions,
    type TranslateOptions,
    type GenerateOptions,
    parse,
    translate,
    generate,
    pp,
    validate as vd
} from "./compiler/index.ts";

/**
 * Compile FAE to ADIF (and IR).
 *
 * @param input - The FAE content to compile
 * (@param options - Options for the parser, translator, and generator)
 *
 * @throws {@link CompilerError}
 * An error occurred during the compilation
 */
export function compile(
    input: string,
    {
        debug = defaults.debug,
        inferences = defaults.inferences,
        pps = defaults.pps,
        validators = defaults.validators,
        separator = defaults.separator
    }: ParseOptions & TranslateOptions & GenerateOptions = {}
) {
    const options = {debug, inferences, pps, validators, separator};

    const ir = translate(parse(input, options), options);
    const adi = generate(ir, options);

    return {ir, adi};
}

const defaults: ParseOptions & TranslateOptions & GenerateOptions = {
    debug: false,
    inferences: [
        ["BAND"],
        ["MODE"],
        ["SUBMODE"],

        ["POTA_REF"],

        ["QSO_DATE"],
        ["TIME_ON"],
        ["FREQ", data => /^.*\..*$/.test(data)],
        ["RST_SENT", data => /^(?:\+|\-)?\d{1,3}$/.test(data)],
        ["RST_RCVD", data => /^(?:\+|\-)?\d{1,3}$/.test(data)],
        ["CALL", data => /^(?=.*[A-Z].*)(?=.*[0-9].*).*$/i.test(data)]
    ],
    pps: [pp.band],
    validators: [vd.viable],
    separator: " "
};

export {CompilerError, inference, pp} from "./compiler/index.ts";
