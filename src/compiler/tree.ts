import type {HeaderField, QSOField} from "../adif.ts";

export interface AST {
    declarations: Map<string, Type>;
    statements: Statement[];
}
export type Type =
    | {
          name: "Number";
          indicator: "N";
          range?: [lo: number, hi?: number];
      }
    | {
          name: "Date";
          indicator: "D";
      }
    | {
          name: "Time";
          indicator: "T";
      }
    | {
          name: "String";
          indicator: "S";
      }
    | {
          name: "MultilineString";
          indicator: "M";
      }
    | {
          name: "Enumeration";
          indicator: "E";
          enumeration: string[];
      }
    | {
          name: "Location";
          indicator: "L";
      };
export type Statement = Record | Factor;
export interface Record {
    type: "record";
    location: Location;
    fields: Field<QSOField>[];
}
export interface Factor {
    type: "factor";
    location: Location;
    fields: Field<QSOField>[];
    statements: Statement[];
}
export interface Location {
    start: Locator;
    end: Locator;
}
export type Field<T extends HeaderField | QSOField = HeaderField | QSOField> = [
    name: T,
    data: string,
    indicator?: Type["indicator"]
];
export interface Locator {
    line: number;
    column: number;
}

export interface IR {
    header: Field<HeaderField>[];
    records: Field<QSOField>[][];
}

export type ADIF = string[];
