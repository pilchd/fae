import assert from "node:assert/strict";
import path from "node:path";
import {describe, it} from "node:test";

import {parse} from "#fae/compiler/index.ts";
import {loads} from "#fae/util.ts";

describe("/src/compiler/parse.ts", function () {
    describe("parse", function () {
        _parse("test/_asset/fae/000");
    });
});

function _parse(base: string) {
    it(`${base.split(path.sep).pop()}.fae`, function () {
        assert.partialDeepStrictEqual(
            parse(loads(base + ".fae")),
            JSON.parse(loads(base + ".json"))
        );
    });
}
