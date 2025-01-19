import {inferBand, type QSOField} from "../adif.ts";
import {type Field} from "./tree.ts";

export function FREQ__inferBand(freq: string): Field<QSOField>[] {
    const band = inferBand(freq);
    if (band)
        return [
            ["FREQ", freq],
            ["BAND", band]
        ];
    return [["FREQ", freq]];
}
