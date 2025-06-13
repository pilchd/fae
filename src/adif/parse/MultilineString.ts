import * as type from "../type.ts";
import {type F, type B, TypeError} from "./index.ts";
import {parser} from "./util.ts";

const re = /^[\x20-\x7E]+$/;

export function f(data: F, type: type.MultilineString) {
    const result = re.exec(data)?.[0];

    if (!result) throw new TypeError(data, type);
    return result;
}
export function b(data: B, type: type.MultilineString) {
    return data
        .map(line => {
            if (re.exec(line)) return line;

            throw new TypeError(line, type);
        })
        .join("\r\n");
}

export default parser(f, b);
