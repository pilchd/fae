import fs from "node:fs";

/**
 * List the integers between the minimum/maximum of many integers.
 *
 * @param params The integers to list among
 */
export function between(...params: number[]) {
    const lo = Math.min(...params);
    const hi = Math.max(...params);

    return Array.from({length: hi - lo + 1}, (_, k) => lo + k);
}

/**
 * Group neighboring array elements that satisfy a predicate into subarrays.
 *
 * @typeParam T - The type of all array elements
 * @typeParam U - The subtype of array elements being clumped (satisfying the predicate)
 *
 * @param array - The `T[]` to group within
 * @param predicate - The predicate to group on
 */
export function clump<T, U extends T>(
    array: T[],
    predicate: (element: T) => element is U
) {
    return array.reduce((pv, cv) => {
        const left = pv[pv.length - 1];

        if (predicate(cv))
            !left || !Array.isArray(left) ? pv.push([cv]) : left.push(cv);
        else pv.push(cv as Exclude<T, U>);

        return pv;
    }, new Array<Exclude<T, U> | U[]>());
}

/**
 * Symmetrically bound a number `t` by `n` units (and bound the result by `b`).
 *
 * @param t - The bound center
 * @param n - The maximum quantity to bind either side by
 * @param b - The lower and upper limits for the bound
 */
export function context(
    target: number,
    number: number = 2,
    bound?: [below: number, above: number]
) {
    //const targets = typeof target === "number" ? [target] : target;

    return [
        Math.max(bound?.[0] ?? -Infinity, target - number),
        Math.min(target + number, bound?.[1] ?? Infinity)
    ];
}

/**
 * Calculate the number of days in a year's month.
 *
 * @param y - The year
 * @param m - The month
 */
export function days(y: number, m: number) {
    switch (m) {
        case 2:
            return (y % 4 == 0 && y % 100 != 0) || y % 400 == 0 ? 29 : 28;
        case 4:
        case 6:
        case 9:
        case 11:
            return 30;
        default:
            return 31;
    }
}

/**
 * Count the number of base-10 digits in a number.
 *
 * @param number The number to count base-10 digits in
 */
export function digits(number: number) {
    return Math.abs(number).toString().length;
}

/**
 * *"spread if"*
 *
 * Create an array containing the defined members of `value` if there are any,
 * nothing if there aren't.
 *
 * @param values - The values to wrap
 */
export function si<T>(...values: (T | undefined)[]): T[] {
    return values.filter((value): value is T => value !== undefined);
}

/**
 * Generate the zero-indexed [line, char] offset from a byte offset.
 *
 * @param string - The string containing the byte offset
 * @param offset - The byte offset in `string`
 */
export function lineate(string: string, offset: number) {
    const lines = splines(string);
    const noffc = lines
        .map(line => line.length)
        .map((_, idx, arr) => (arr[idx] += arr[idx - 1] ?? 0));

    const line = noffc.findIndex(value => offset <= value - 1);
    const char = offset - (noffc[line - 1] ?? 0);
    return [line, char];
}

/**
 * *"load string"*
 *
 * Load a string from a file.
 *
 * @param path - The path of the file to load from
 */
export function loads(path: string) {
    return fs.readFileSync(path).toString();
}

/**
 * Replace ASCII control characters in `string` accordingly:
 *
 * 0x0A: \n
 *
 * @param string - The string to perform the replacement on
 */
export function printnon(string: string) {
    return string.replace(/\n/g, "\\n");
}

/**
 * Generate an array of key-value pairs from the key-value pairs of a **literal** `Record`.
 *
 * @param record The record to generate from
 */
export function recmap<K extends PropertyKey, V>(
    record: Record<K, V>
): [K, V][] {
    return Object.entries(record) as [K, V][];
}

/**
 * *"split lines"*
 *
 * Split a string into its complete lines (terminated on `\n` or `\r\n`).
 *
 * @param string The string to split
 */
export function splines(string: string) {
    return string.match(/.*(?:\n|\r\n)/g) ?? [string];
}

/**
 * Apply a stack of string mutations at byte offsets.
 *
 * @param string - The string to mutate
 * @param ranges - The ranges to apply mutations at
 */
export function strfranges(
    string: string,
    ranges: {at: number; to: number; fn: (string: string) => string}[]
) {
    let from = 0;
    let fn = new Map<number, (string: string) => string>();

    return (
        ranges
            .flatMap(({at, to, fn}, idx) => [
                {
                    id: idx,
                    offset: Math.min(at, to),
                    do: "go" as const,
                    fn
                },
                {
                    id: idx,
                    offset: Math.max(at, to),
                    do: "og" as const
                }
            ])
            .sort((a, b) => a.offset - b.offset)
            .reduce((pv, cv) => {
                const next = (pv += [...fn.values()]
                    .reverse()
                    .reduce((pv, fn) => fn(pv), string.slice(from, cv.offset)));

                from = cv.offset;
                if (cv.do === "go") fn.set(cv.id, cv.fn);
                if (cv.do === "og") fn.delete(cv.id);

                return next;
            }, "") + string.slice(from)
    );
}

/**
 * Format a string iterable `"like" | "this"`.
 *
 * @param values The values to format
 */
export function ftuple(values: Iterable<string>) {
    return Array.from(values)
        .map(value => `"${value}"`)
        .join(" | ");
}

/**
 * *"T union T array dispatch"*
 *
 * Given `arg: T | T[]`, return `a(arg, ...args)` if `arg` is a `T` and `b(arg,
 * ...args)` if `arg` is a `T[]`.
 *
 * @typeParam T - The non-array type of `arg`
 *
 * @param a - The function to call on `T` (with `args`)
 * @param b - The function to call on `T[]` (with `args)
 * @param arg - `T | T[]`
 * @param args - Rest arguments to `a` and `b`
 */
export function tutad<T, A, B, V extends readonly unknown[]>(
    a: (arg: T, ...args: V) => A,
    b: (arg: T[], ...args: V) => B,
    data: T | T[],
    ...args: V
) {
    return !Array.isArray(data) ? a(data, ...args) : b(data, ...args);
}

/**
 * From `T`, pick types having the property `U`.
 *
 * @typeParam T - The type to pick from
 * @typeParam U - The property to select for among `T`
 */
export type ExtractHasProperty<T, U extends PropertyKey> = T extends T
    ? U extends keyof T
        ? T
        : never
    : never;

export type OrArray<T> = T | T[];
