import * as adif from "../adif/index.ts";

export interface AST {
    fields: [name: adif.field.Name_U, type: adif.type.Indicated][];
    statements: Statement[];
}

export type Statement = Record | Factor;
export interface Record extends Node {
    node: "record";
    fl: Fle[];
}
export interface Factor extends Node {
    node: "factor";
    factors: (AliasDeclaration | Fle)[];
    statements: Statement[];
}

export interface Range {
    start: Offset;
    end: Offset;
}
export type Offset = number;

export interface AliasDeclaration {
    node: "declaration";
    of: "alias";
    symbol: Symbol;
    fl: Fle[];
}
export type Symbol = string;

export type Fle = Alias | Pop | Nop | Name | Data;
export interface Alias extends Node {
    node: "alias";
    symbol: Symbol;
}
export interface Pop extends Node {
    node: "pop";
}
export interface Nop extends Node {
    node: "nop";
}
export type Name = Node & {node: "name"} & (
        | {name: adif.field.Name_Q; type: adif.type.Indicated}
        | {name: adif.field.Name_Q<never>}
    );
export interface Data extends Node {
    node: "data";
    data: string;
}

export interface Node {
    node: string;
    locator?: Range;
}
