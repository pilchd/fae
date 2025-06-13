import {type Field, field} from "../../adif/index.ts";

/**
 * A function to determine a validation result on a record's field list.
 *
 * The function should return nothing (`null | undefined`) for a correct field
 * list; for an incorrect field list, it should return a hint describing the
 * invalidity.
 */
export type Validator = (
    fl: Field<string>[]
) => string | null | undefined | void;

export const viable: Validator = fl => {
    const required: field.Name_Q[] = [
        "QSO_DATE",
        "TIME_ON",
        "BAND",
        "CALL",
        "MODE"
    ];
    const included = new Set(fl.map(field => field[0]));

    const excluded = required.filter(name => !included.has(name));

    if (excluded.length > 0)
        return `Required fields are missing from this record: ${excluded}`;
};
