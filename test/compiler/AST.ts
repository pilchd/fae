import {field, type} from "#fae/adif/index.ts";
import * as AST from "#fae/compiler/AST.ts";

export type Fle = Alias | Pop | Nop | Name | Data;
export type Alias = [symbol: AST.Symbol];
export type Pop = "pop";
export type Nop = "nop";
export type Name = field.Name_Q<never>;
export type Data = type.Data;

export function expand<const T extends Fle[]>(
    ...args: T
): {[K in keyof T]: Dictionary<T[K]>} {
    return args.map(arg =>
        Array.isArray(arg) // AST.Alias
            ? {
                  node: "alias",
                  symbol: arg[0]
              }
            : arg === "pop" // AST.Pop
              ? {
                    node: "pop"
                }
              : arg === "nop" // AST.Nop
                ? {
                      node: "nop"
                  }
                : Object.keys(field.name_type).includes(arg) // AST.Name
                  ? {
                        node: "name",
                        name: arg as field.Name_Q
                    }
                  : // AST.Data
                    {
                        node: "data",
                        data: arg
                    }
    ) as {[K in keyof T]: Dictionary<T[K]>};
}

type Dictionary<T extends Fle> =
    T extends Array<unknown>
        ? AST.Alias
        : T extends Pop
          ? AST.Pop
          : T extends Nop
            ? AST.Nop
            : T extends Name
              ? AST.Name
              : T extends string
                ? AST.Pop | AST.Nop | AST.Name | AST.Data
                : never;
