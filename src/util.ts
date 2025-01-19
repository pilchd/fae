export type DeepPartial<T> =
    T extends Array<unknown>
        ? T
        : T extends (...args: never) => unknown
          ? T
          : T extends object
            ? {
                  [K in keyof T]?: DeepPartial<T[K]>;
              }
            : T;
