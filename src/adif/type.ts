import {type ExtractHasProperty} from "../util.ts";
import type {/*type*/ Name_Q} from "./field.ts";

export type Type =
    | CreditList
    | SponsoredAwardList
    | Boolean
    //Digit
    | Integer
    | Number
    //PositiveInteger
    //Character
    //IntlCharacter
    | Date
    | Time
    | IOTARefNo
    | String
    //IntlString
    | MultilineString
    //IntlMultilineString
    | Enumeration
    | GridSquare
    | GridSquareExt
    | GridSquareList
    | Location
    //POTARef
    | POTARefList
    | SecondarySubdivisionList
    | SecondaryAdministrativeSubdivisionListAlt
    | SOTARef
    | WWFFRef;
export type Indicated = ExtractHasProperty<Type, "indicator">;
export type Indicator = Required<Indicated>["indicator"];

export type Data = string;

/** https://adif.org/315/ADIF_315.htm#CreditList */
export interface CreditList {
    name: "CreditList";
}

/** https://adif.org/315/ADIF_315.htm#SponsoredAwardList */
export interface SponsoredAwardList {
    name: "SponsoredAwardList";
}

/** https://adif.org/315/ADIF_315.htm#Boolean */
export interface Boolean {
    name: "Boolean";
    indicator?: "B";
}

/** https://adif.org/315/ADIF_315.htm#Integer */
export interface Integer {
    name: "Integer";
    range?: [lower: number, upper?: number];
}

/** https://adif.org/315/ADIF_315.htm#Number */
export interface Number {
    name: "Number";
    indicator?: "N";
    range?: [lower: number, upper?: number];
}

/** https://adif.org/315/ADIF_315.htm#Date */
export interface Date {
    name: "Date";
    indicator?: "D";
}

/** https://adif.org/315/ADIF_315.htm#Time */
export interface Time {
    name: "Time";
    indicator?: "T";
}

/** https://adif.org/315/ADIF_315.htm#IOTARefNo */
export interface IOTARefNo {
    name: "IOTARefNo";
}

/** https://adif.org/315/ADIF_315.htm#String */
export interface String {
    name: "String";
    indicator?: "S";
}

/** https://adif.org/315/ADIF_315.htm#MultilineString */
export interface MultilineString {
    name: "MultilineString";
    indicator?: "M";
}

/** https://adif.org/315/ADIF_315.htm#Enumeration */
export type Enumeration = {
    name: "Enumeration";
    indicator?: "E";
} & (
    | {
          enumeration: Set<Data>;
      }
    | {
          dependent: Name_Q;
          fn: Record<Data, Set<Data>>;
      }
);

/** https://adif.org/315/ADIF_315.htm#GridSquare */
export interface GridSquare {
    name: "GridSquare";
}

/** https://adif.org/315/ADIF_315.htm#GridSquareExt */
export interface GridSquareExt {
    name: "GridSquareExt";
}

/** https://adif.org/315/ADIF_315.htm#GridSquareList */
export interface GridSquareList {
    name: "GridSquareList";
}

/** https://adif.org/315/ADIF_315.htm#Location */
export interface Location {
    name: "Location";
    indicator?: "L";
}

/** https://adif.org/315/ADIF_315.htm#POTARefList */
export interface POTARefList {
    name: "POTARefList";
}

/** https://adif.org/315/ADIF_315.htm#SecondarySubdivisionList */
export interface SecondarySubdivisionList {
    name: "SecondarySubdivisionList";
}

/** https://adif.org/315/ADIF_315.htm#SecondaryAdministrativeSubdivisionListAlt */
export interface SecondaryAdministrativeSubdivisionListAlt {
    name: "SecondaryAdministrativeSubdivisionListAlt";
}

/** https://adif.org/315/ADIF_315.htm#SOTARef */
export interface SOTARef {
    name: "SOTARef";
}

/** https://adif.org/315/ADIF_315.htm#WWFFRef */
export interface WWFFRef {
    name: "WWFFRef";
}

export const CreditList: () => CreditList = () => ({name: "CreditList"});

export const SponsoredAwardList: () => SponsoredAwardList = () => ({
    name: "SponsoredAwardList"
});

export const Boolean: () => Boolean = () => ({name: "Boolean", indicator: "B"});

export const Digit: () => Boolean = () => ({name: "Boolean", indicator: "B"});

export const Integer: {
    (): Integer;
    (lower: number, upper?: number): Integer;
} = (lower?: number, upper?: number) => ({
    name: "Integer",
    range: lower ? [lower, upper] : undefined
});

export const Number: {
    (): Number;
    (lower: number, upper?: number): Number;
} = (lower?: number, upper?: number) => ({
    name: "Number",
    indicator: "N",
    range: lower ? [lower, upper] : undefined
});

export const Date: () => Date = () => ({name: "Date", indicator: "D"});

export const Time: () => Time = () => ({name: "Time", indicator: "T"});

export const IOTARefNo: () => IOTARefNo = () => ({name: "IOTARefNo"});

export const String: () => String = () => ({name: "String", indicator: "S"});

export const MultilineString: () => MultilineString = () => ({
    name: "MultilineString",
    indicator: "M"
});

export const Enumeration: {
    (enumeration: Set<string>): Enumeration;
    (dependent: Name_Q, fn: Record<Data, Set<string>>): Enumeration;
} = (
    enumeration_dependent: Set<string> | Name_Q,
    fn?: Record<Data, Set<string>>
) => ({
    name: "Enumeration",
    indicator: "E",
    ...(() =>
        typeof enumeration_dependent !== "string"
            ? {enumeration: enumeration_dependent}
            : {dependent: enumeration_dependent, fn: fn!})()
});

export const GridSquare: () => GridSquare = () => ({name: "GridSquare"});

export const GridSquareExt: () => GridSquareExt = () => ({
    name: "GridSquareExt"
});
export const GridSquareList: () => GridSquareList = () => ({
    name: "GridSquareList"
});

export const Location: () => Location = () => ({name: "Location"});

export const POTARefList: () => POTARefList = () => ({name: "POTARefList"});

export const SecondarySubdivisionList: () => SecondarySubdivisionList = () => ({
    name: "SecondarySubdivisionList"
});
export const SecondaryAdministrativeSubdivisionListAlt: () => SecondaryAdministrativeSubdivisionListAlt =
    () => ({name: "SecondaryAdministrativeSubdivisionListAlt"});

export const SOTARef: () => SOTARef = () => ({name: "SOTARef"});

export const WWFFRef: () => WWFFRef = () => ({name: "WWFFRef"});

/**
 * *"infer indicator"*
 *
 * Infer the type indicator from a `Type`.
 */
export function ii(type: Indicated) {
    return (
        type.indicator ??
        (
            {
                Boolean: "B",
                Number: "N",
                Date: "D",
                Time: "T",
                String: "S",
                MultilineString: "M",
                Enumeration: "E",
                Location: "L"
            } as const
        )[type.name]
    );
}
