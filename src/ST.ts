/**
 * A symbol table encoded by an array of `Map`.
 *
 * @typeParam K - The key type of the symbol table
 * @typeParam V - The value type of the symbol table
 */
export type ST<K, V> = Map<K, V>[];

/**
 * Retrieve a symbol from the current scope (index 0).
 *
 * @param st - The `ST` to retrieve from
 * @param k - The key to retrieve
 */
export function st_l<K, V>(st: ST<K, V>, k: K): V | undefined {
    return st[0].get(k);
}
/**
 * Retrieve a symbol from the top-most scope.
 *
 * @param st - The `ST` to retrieve from
 * @param k - The key to retrieve
 */
export function st_g<K, V>(st: ST<K, V>, k: K): V | undefined {
    for (const table of st) if (table.has(k)) return table.get(k);
}
