import assert from "node:assert/strict";
import {describe, it} from "node:test";

import * as util from "#fae/util.ts";

describe("/src/util.ts", function () {
    describe("context", function () {
        it(function () {
            assert.deepStrictEqual(util.context(5, 2), [3, 7]);
            assert.deepStrictEqual(util.context(5, 10), [-5, 15]);
            assert.deepStrictEqual(util.context(5, 10, [0, 100]), [0, 15]);
        });
    });

    describe("lineate", function () {
        it(function () {
            const string = util.loads("test/_asset/lineate.txt");

            assert.deepStrictEqual(util.lineate(string, 1), [0, 1]);
            assert.deepStrictEqual(util.lineate(string, 10), [0, 10]);
            assert.deepStrictEqual(util.lineate(string, 100), [1, 21]);
        });
    });

    describe("strfranges", function () {
        it(function () {
            const string = "hello, world";
            const ranges = [
                {at: 2, to: 7, fn: (string: string) => `(${string})`}
            ];

            assert.strictEqual(
                util.strfranges(string, ranges),
                "he(llo, )world"
            );
        });
        it(function () {
            const string = "hello, world";
            const ranges = [
                {at: 2, to: 7, fn: (string: string) => `(${string})`},
                {at: 4, to: 5, fn: (string: string) => `[${string}]`}
            ];

            assert.strictEqual(
                util.strfranges(string, ranges),
                "he(ll)([o])(, )world"
            );
        });
    });
});
