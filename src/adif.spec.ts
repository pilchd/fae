import assert from "node:assert/strict";
import {describe, it} from "node:test";

import {render, type HeaderField, type QSOField} from "./adif.ts";
import {type Field} from "./compiler/tree.ts";

describe("adif.ts", function () {
    describe("render", function () {
        it("header fields", function () {
            const fields: Field<HeaderField>[] = [
                ["ADIF_VER", "1.0.0"],
                ["USERDEF1", "SweaterSize,{S,M,L}", "E"],
                ["USERDEF2", "ShoeSize,{5:20}", "N"]
            ];

            assert.strictEqual(
                render("header", fields),
                "<ADIF_VER:5>1.0.0 <USERDEF1:19:E>SweaterSize,{S,M,L} <USERDEF2:15:N>ShoeSize,{5:20} <EOH>"
            );
        });
        it("QSO fields", function () {
            const fields: Field<QSOField>[] = [
                ["BAND", "20m"],
                ["MODE", "SSB"]
            ];

            assert.strictEqual(
                render("qso", fields),
                "<BAND:3>20m <MODE:3>SSB <EOR>"
            );
        });
        it("leftmost & rightmost", function () {
            const fields: Field<QSOField>[] = [
                ["BAND", "40m"],
                ["QSO_DATE", "20250101"],
                ["BAND", "20m"],
                ["MODE", "SSB"],
                ["BAND", "40m"]
            ];

            assert.strictEqual(
                render("qso", fields),
                "<BAND:3>40m <QSO_DATE:8>20250101 <MODE:3>SSB <EOR>"
            );
        });
    });
});
