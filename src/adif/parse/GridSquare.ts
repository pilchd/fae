import * as type from "../type.ts";
import {type F, type B, TypeError} from "./index.ts";
import {b_f, parser} from "./util.ts";

const re = /[A-R]{2}(?:[0-9]{2}(?:[A-X]{2}(?:[0-9]{2})?)?)?/i;

function f(data: F, type: type.GridSquare) {
    if (!re.test(data)) throw new TypeError(data, type);
    return data;
}
let b = b_f(f);

export default parser(f, b);
