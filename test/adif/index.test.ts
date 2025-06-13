import assert from "node:assert/strict";
import {describe, it} from "node:test";

import {type Field, field, type} from "#fae/adif/index.ts";

import {render, udf, createdAt} from "#fae/adif/index.ts";

describe("src/adif/index.ts", function () {
    describe("render", function () {
        it("header fields", function () {
            const fields: Field<field.Name_H>[] = [
                ["ADIF_VER", "1.0.0"],
                ["USERDEF1", "EPC", "N"],
                ["USERDEF2", "SweaterSize,{S,M,L}", "E"],
                ["USERDEF3", "ShoeSize,{5:20}", "N"]
            ];

            assert.strictEqual(
                render("header", fields),
                "<ADIF_VER:5>1.0.0 <USERDEF1:3:N>EPC <USERDEF2:19:E>SweaterSize,{S,M,L} <USERDEF3:15:N>ShoeSize,{5:20} <EOH>"
            );
        });
        it("QSO fields", function () {
            const fields: Field<field.Name_Q<never>>[] = [
                ["BAND", "20m"],
                ["MODE", "SSB"]
            ];

            assert.strictEqual(
                render("qso", fields),
                "<BAND:3>20m <MODE:3>SSB <EOR>"
            );
        });
    });

    describe("udf", function () {
        it("EPC", function () {
            assert.deepStrictEqual(udf(1, "EPC", type.Number()), [
                "USERDEF1",
                "EPC",
                "N"
            ]);
        });
        it("SweaterSize", function () {
            assert.deepStrictEqual(
                udf(
                    2,
                    "SweaterSize",
                    type.Enumeration(new Set(["S", "M", "L"]))
                ),
                ["USERDEF2", "SweaterSize,{S,M,L}", "E"]
            );
        });
        it("ShoeSize", function () {
            assert.deepStrictEqual(udf(3, "ShoeSize", type.Number(5, 20)), [
                "USERDEF3",
                "ShoeSize,{5:20}",
                "N"
            ]);
        });
    });

    describe("createdAt", function () {
        it(function () {
            const result = createdAt();

            assert.equal(result.length, 3);
            assert.equal(result[1].length, 14);
        });
    });
});
