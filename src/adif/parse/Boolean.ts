import * as type from "../type.ts";
import {type F, type B, TypeError} from "./index.ts";
import {b_f, parser} from "./util.ts";

const re_N = /^0|x|no|✗$/i;
const re_Y = /^1|o|yes|✓$/i;

function f(data: F, type: type.Boolean) {
    if (re_N.test(data)) return "N";
    if (re_Y.test(data)) return "Y";

    throw new TypeError(data, type);
}
let b = b_f(f);

export default parser(f, b);
