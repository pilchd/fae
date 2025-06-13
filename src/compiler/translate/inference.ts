import {field} from "../../adif/index.ts";

/** A field name to use for unnamed, type-compatible field data. */
export type Inference = [
    /** The ADIF field name being inferred */
    name: field.Name_Q<never>,
    /** An additional predicate for determining inferences based on their data */
    predicate?: (
        /** The data for `name` in this potential inference */
        data: string
    ) => boolean | null | undefined | void
];
