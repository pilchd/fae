import {distance} from "fastest-levenshtein";

import {ftuple} from "../../util.ts";
import * as type from "../type.ts";
import {type F, type B, TypeError} from "./index.ts";
import {b_f, parser} from "./util.ts";

function f(data: F, type: type.Enumeration, dependent?: type.Data) {
    if ("enumeration" in type)
        if (!type.enumeration.has(data.toUpperCase()))
            throw new TypeError(
                data,
                type,
                `Did you mean ${ftuple(autocorrect(data, type.enumeration).slice(0, 3))}?`
            );

    if ("dependent" in type) {
        const values = new Set(
            Object.values(type.fn).flatMap(val => Array.from(val))
        );

        if (!values.has(data)) {
            throw new TypeError(
                data,
                type,
                `Did you mean ${ftuple(autocorrect(data, values).slice(0, 3))}?`
            );
        }

        if (dependent)
            if (!type.fn[dependent]?.has(data)) throw new TypeError(data, type);
    }

    return data;
}
let b = b_f(f);

function autocorrect(
    data: string,
    enumeration: Iterable<type.Data>
): type.Data[] {
    return Array.from(enumeration)
        .map<[distance: number, value: string]>(value => [
            distance(data, value),
            value
        ])
        .sort(([a], [b]) => a - b)
        .map(([, value]) => value);
}

export default parser(f, b);
