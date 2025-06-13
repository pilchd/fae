import * as type from "../type.ts";
import {type F, type B, TypeError} from "./index.ts";
import {parser} from "./util.ts";

const re = /^[\x20-\x7E]+$/;

export function f(data: F, type: type.String) {
    const result = re.exec(data)?.[0];

    if (!result) throw new TypeError(data, type);
    return result;
}
export function b(data: B, type: type.String) {
    return data
        .filter(data => data)
        .map(line => {
            if (re.exec(line)) return line;

            throw new TypeError(line, type);
        })
        .join(" ");
}

export default parser(f, b);
