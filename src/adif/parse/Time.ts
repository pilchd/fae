import * as type from "../type.ts";
import {type F, type B, TypeError} from "./index.ts";
import {b_f, parser} from "./util.ts";

const re =
    /^(?<h>[0-1][0-9]|2[0-3])(:)?(?<m>[0-5][0-9])(?:\2(?<s>[0-5][0-9]))?$/;

function f(data: F, type: type.Time) {
    const result = re.exec(data);
    if (!result?.groups) throw new TypeError(data, type);

    const {h, m, s = ""} = result.groups;

    return `${h}${m}${s}`;
}
let b = b_f(f);

export default parser(f, b);
