import * as type from "../type.ts";
import {type F, type B, TypeError} from "./index.ts";
import {b_f, parser} from "./util.ts";

// TODO ISO 3166-2
export const re = /^[0-9A-Za-z]{1,4}-[0-9]{4,5}$/;

function f(data: F, type: type.POTARefList) {
    data.split(",").forEach(data => {
        if (!re.test(data.trim())) throw new TypeError(data, type);
    });
    return data.replace(/\s/g, "");
}
let b = b_f(f);

export default parser(f, b);
