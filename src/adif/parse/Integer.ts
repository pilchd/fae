import * as type from "../type.ts";
import {type F, type B, TypeError} from "./index.ts";
import {b_f, parser} from "./util.ts";

const re = /^-?[0-9]+$/;

function f(data: F, type: type.Integer) {
    if (!re.test(data)) throw new TypeError(data, type);
    const number = parseInt(data);

    if (type.range?.[0] && number < type.range[0])
        throw new TypeError(data, type, "bounds low");
    if (type.range?.[1] && number > type.range[1])
        throw new TypeError(data, type, "bounds hig");

    return data;
}
let b = b_f(f);

export default parser(f, b);
