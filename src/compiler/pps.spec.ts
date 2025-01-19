import assert from "node:assert/strict";
import {describe, it} from "node:test";

import * as pps from "./pps.ts";

describe("pps.ts", function () {
    describe("FREQ__inferBand", function () {
        it("infer 14.074", function () {
            assert.deepStrictEqual(pps.FREQ__inferBand("14.074"), [
                ["FREQ", "14.074"],
                ["BAND", "20m"]
            ]);
        });
    });
});
