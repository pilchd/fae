import assert from "node:assert/strict";
import {describe, it} from "node:test";

import {field, type} from "#fae/adif/index.ts";
import * as AST from "#fae/compiler/AST.ts";
import {type OrArray, recmap} from "#fae/util.ts";

import {expand as fl} from "../AST.ts";

import {distribute} from "#fae/compiler/translate/index.ts";

describe("/src/compiler/translate/index.ts", function () {
    describe("distribute", function () {
        describe("depth 1 (well-formed)", function () {
            _distribute({
                st: {
                    node: "record",
                    fl: fl("CALL", "W1AW")
                },
                to: {
                    CALL: "W1AW"
                }
            });
            _distribute({
                st: {
                    node: "factor",
                    factors: [
                        {
                            node: "declaration",
                            of: "alias",
                            symbol: ">",
                            fl: fl("RST_SENT")
                        }
                    ],
                    statements: [
                        {
                            node: "record",
                            fl: fl([">"], "59")
                        }
                    ]
                },
                to: {
                    RST_SENT: "59"
                }
            });
        });

        describe("depth 2 (well-formed)", function () {
            _distribute({
                st: {
                    node: "record",
                    fl: fl("QSO_DATE", "CALL", "pop", "W1AW")
                },
                to: {
                    CALL: "W1AW"
                }
            });
        });

        describe("depth 3 (well-formed)", function () {
            _distribute({
                st: {
                    node: "record",
                    fl: fl(
                        "QSO_DATE",
                        "TIME_ON",
                        "FREQ",
                        "2025-01-01",
                        "1234",
                        "14.074"
                    )
                },
                to: {
                    QSO_DATE: "20250101",
                    TIME_ON: "1234",
                    FREQ: "14.074"
                }
            });
        });
    });
});

function _distribute({
    st,
    to
}: {
    st: AST.Statement;
    to: OrArray<Record<field.Name, type.Data>>;
}) {
    it(function () {
        assert.deepStrictEqual(
            distribute(st),
            [to].flat().map(record => recmap(record))
        );
    });
}
