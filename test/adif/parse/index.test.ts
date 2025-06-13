import assert from "node:assert/strict";
import {describe, it} from "node:test";

import {type} from "#fae/adif/index.ts";

import {type F, type B, parse} from "#fae/adif/parse/index.ts";

describe("/src/adif/parse/index.ts", function () {
    describe("parse", function () {
        describe("Boolean (well-formed)", function () {
            pp(type.Boolean(), "0", "N");
            pp(type.Boolean(), "X", "N");
            pp(type.Boolean(), "no", "N");
            pp(type.Boolean(), "✗", "N");
            pp(type.Boolean(), "1", "Y");
            pp(type.Boolean(), "O", "Y");
            pp(type.Boolean(), "yes", "Y");
            pp(type.Boolean(), "✓", "Y");
        });

        describe("Integer (well-formed)", function () {
            pp(type.Integer(), "4");
        });
        describe("Integer (ill-formed)", function () {
            pf(type.Integer(), "--4");
        });

        describe("Number (well-formed)", function () {
            pp(type.Number(), "-4815");
            pp(type.Number(), "14.074");
        });
        describe("Number (ill-formed)", function () {
            pf(type.Number(), "14.025.5");
        });

        describe("Date (well-formed)", function () {
            pp(type.Date(), "20250101", "20250101");
            pp(type.Date(), "2025-01-01", "20250101");
            pp(type.Date(), "2025/01/01", "20250101");
            pp(type.Date(), "2025\\01\\01", "20250101");
            pp(type.Date(), "2025_01_01", "20250101");
        });

        describe("Time (well-formed)", function () {
            pp(type.Time(), "1234");
        });

        describe("GridSquare (well-formed)", function () {
            pp(type.GridSquare(), "AR");
            pp(type.GridSquare(), "AR09");
            pp(type.GridSquare(), "AR09AX");
            pp(type.GridSquare(), "AR09AX09");
        });

        describe("POTARefList (well-formed)", function () {
            pp(type.POTARefList(), "K-5033");
            pp(type.POTARefList(), "K-10000");
            //pp(type.POTARefList(), "VE-5082@CA-AB");
            pp(type.POTARefList(), "8P-0012");
            pp(type.POTARefList(), "VK-0556");
            //pp(type.POTARefList(), "K-4562@US-CA");
            pp(
                type.POTARefList(),
                "K-5033,K-10000, 8P-0012,VK-0556",
                "K-5033,K-10000,8P-0012,VK-0556"
            );
        });
    });
});

/**
 * "parse pass"
 *
 * Generate a `node:test` function to test an ADIF parser on a single correct
 * data with `node:assert` assertions.
 *
 * @param data The data to parse
 * @param parser The parser under test
 * @param result The expected parse (equal to `data` if `undefined`)
 */
export function pp(type: type.Type, data: F | B, result?: type.Data) {
    it(`parse ${type.name} '${data}'${result ? ` → '${result}'` : ""}`, function () {
        assert.equal(parse(data, type), result ?? data);
    });
}
/**
 * "parse fail"
 *
 * Generate a `node:test` function to test an ADIF parser on a single incorrect
 * data with `node:assert` assertions.
 *
 * @param parser The parser under test
 * @param type The type name parsed by the parser
 * @param input The data to parse
 */
export function pf(type: type.Type, data: F | B) {
    it(`error ${type.name} '${data}'`, function () {
        assert.throws(() => parse(data, type), {
            name: "TypeError",
            type: type,
            data: data
        });
    });
}
