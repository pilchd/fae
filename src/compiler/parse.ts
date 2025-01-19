import * as parser from "../parser.js";
import type {AST, Location} from "./tree.ts";

/**
 * Options for the parser
 */
export interface Options {
    /**
     * The path or other friendly name of the input (for rendering errors)
     */
    name: string;
    /**
     * Enable the parser's debug output
     */
    debug: boolean;
}

export default function parse(
    input: string,
    {name: grammarSource, debug}: Options
): AST {
    try {
        return parser.parse(input, {
            grammarSource,
            debug
        });
    } catch (error) {
        if (error instanceof parser.SyntaxError)
            throw new SyntaxError(
                error.format([{source: grammarSource, text: input}]),
                error.location
            );
        throw error;
    }
}

/**
 * Errors thrown by the parser extend this class.
 */
export class SyntaxError extends Error {
    constructor(message: string, location: Location) {
        super(message);
        this.location = location;
    }
    location: Location;
}
