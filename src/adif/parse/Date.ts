import {days} from "../../util.ts";
import * as type from "../type.ts";
import {type F, type B, TypeError} from "./index.ts";
import {b_f, parser} from "./util.ts";

const re = /^(?<y>\d{4})([-\/\\_])?(?<m>\d{2})\2(?<d>\d{2})$/;

function f(data: F, type: type.Date) {
    const result = re.exec(data);
    if (!result?.groups) throw new TypeError(data, type);

    const {y, m, d} = result.groups;
    const [yi, mi, di] = [parseInt(y), parseInt(m), parseInt(d)];
    const bound = days(yi, mi);

    if (di > bound)
        throw new TypeError(
            data,
            type,
            `the month '${mi}' in '${y}' had only ${bound} days (specified '${d}')`
        );

    return `${y}${m}${d}`;
}
let b = b_f(f);

export default parser(f, b);
