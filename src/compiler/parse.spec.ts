import assert from "node:assert/strict";
import fs from "node:fs";
import {describe, it} from "node:test";

import parse, {SyntaxError} from "./parse.ts";
import type {Statement} from "./tree.ts";

describe("parse.ts", function () {
    describe("parse", function () {
        describe("type Number (well-formed)", function () {
            passStatement("here", "- FREQ -4815", {
                type: "record",
                fields: [["FREQ", "-4815"]]
            });
            passStatement("here", "- FREQ 14.074", {
                type: "record",
                fields: [["FREQ", "14.074"]]
            });
        });
        describe("type Number (ill-formed)", function () {
            failStatement("here", "- FREQ 14.025.5", [
                [1, 14],
                [1, 15]
            ]);
        });

        describe("type Date (well-formed)", function () {
            passStatement("here", "- QSO_DATE 20250101", {
                type: "record",
                fields: [["QSO_DATE", "20250101"]]
            });
            passStatement("here", "- QSO_DATE 2025-01-01", {
                type: "record",
                fields: [["QSO_DATE", "20250101"]]
            });
            passStatement("here", "- QSO_DATE 2025/01/01", {
                type: "record",
                fields: [["QSO_DATE", "20250101"]]
            });
            passStatement("here", "- QSO_DATE 2025\\01\\01", {
                type: "record",
                fields: [["QSO_DATE", "20250101"]]
            });
            passStatement("here", "- QSO_DATE 2025_01_01", {
                type: "record",
                fields: [["QSO_DATE", "20250101"]]
            });
        });
        describe("type Date (ill-formed)", function () {
            failStatement("here", "- QSO_DATE 20250100", [
                [1, 12],
                [1, 13]
            ]);
            failStatement("here", "- QSO_DATE 20250000", [
                [1, 12],
                [1, 13]
            ]);
            failStatement("here", "- QSO_DATE 20250100", [
                [1, 12],
                [1, 13]
            ]);
            failStatement("here", "- QSO_DATE 20251301", [
                [1, 12],
                [1, 13]
            ]);
        });
        describe("type Date (illegal)", function () {
            failStatement("here", "- QSO_DATE 20250132", [
                [1, 12],
                [1, 13]
            ]);
            passStatement("here", "- QSO_DATE 20240229", {
                type: "record",
                fields: [["QSO_DATE", "20240229"]]
            });
            failStatement("here", "- QSO_DATE 20250229", [
                [1, 12],
                [1, 20]
            ]);
            failStatement("here", "- QSO_DATE 20250332", [
                [1, 12],
                [1, 13]
            ]);
            failStatement("here", "- QSO_DATE 20250431", [
                [1, 12],
                [1, 20]
            ]);
            failStatement("here", "- QSO_DATE 20250532", [
                [1, 12],
                [1, 13]
            ]);
            failStatement("here", "- QSO_DATE 20250631", [
                [1, 12],
                [1, 20]
            ]);
            failStatement("here", "- QSO_DATE 20250732", [
                [1, 12],
                [1, 13]
            ]);
            failStatement("here", "- QSO_DATE 20250832", [
                [1, 12],
                [1, 13]
            ]);
            failStatement("here", "- QSO_DATE 20250931", [
                [1, 12],
                [1, 20]
            ]);
            failStatement("here", "- QSO_DATE 20251032", [
                [1, 12],
                [1, 13]
            ]);
            failStatement("here", "- QSO_DATE 20251131", [
                [1, 12],
                [1, 20]
            ]);
            failStatement("here", "- QSO_DATE 20251232", [
                [1, 12],
                [1, 13]
            ]);
        });

        describe("type Time (well-formed)", function () {
            passStatement("here", "- TIME_ON 0000", {
                type: "record",
                fields: [["TIME_ON", "0000"]]
            });
        });
        describe("type Time (ill-formed)", function () {
            failStatement("here", "- TIME_ON 0060", [
                [1, 11],
                [1, 12]
            ]);
            failStatement("here", "- TIME_ON 2400", [
                [1, 11],
                [1, 12]
            ]);
        });

        describe("type String (well-formed)", function () {
            passStatement("here", '- CALL he\\\\o""world', {
                type: "record",
                // he\\o""world
                fields: [["CALL", 'he\\\\o""world']]
            });
            passStatement("here", '- CALL "he\\\\\\\\o\\"\\"world"', {
                type: "record",
                // he\\o""world
                fields: [["CALL", 'he\\\\o""world']]
            });
            passStatement("file", "test/type/String/0.fae", {
                type: "record",
                // he\\o" "world
                fields: [["CALL", 'he\\\\o" "world']]
            });
        });

        describe("type MultilineString (well-formed)", function () {
            passStatement("here", '- NOTES he\\\\o""world', {
                type: "record",
                fields: [["NOTES", 'he\\\\o""world']]
            });
            passStatement("here", '- NOTES "he\\\\\\\\o\\"\\n\\"world"', {
                type: "record",
                fields: [["NOTES", 'he\\\\o"\r\n"world']]
            });
            passStatement("file", "test/type/MultilineString/0.fae", {
                type: "record",
                fields: [["NOTES", 'he\\\\o"\r\n"world']]
            });
        });

        describe("type GridSquare (well-formed)", function () {
            passStatement("here", "- GRIDSQUARE AR", {
                type: "record",
                fields: [["GRIDSQUARE", "AR"]]
            });
            passStatement("here", "- GRIDSQUARE AR09", {
                type: "record",
                fields: [["GRIDSQUARE", "AR09"]]
            });
            passStatement("here", "- GRIDSQUARE AR09ax", {
                type: "record",
                fields: [["GRIDSQUARE", "AR09ax"]]
            });
            passStatement("here", "- GRIDSQUARE AR09ax09", {
                type: "record",
                fields: [["GRIDSQUARE", "AR09ax09"]]
            });
        });
        describe("type GridSquare (ill-formed)", function () {
            failStatement("here", "- GRIDSQUARE AS", [
                [1, 14],
                [1, 15]
            ]);
            failStatement("here", "- GRIDSQUARE AR0A", [
                [1, 16],
                [1, 17]
            ]);
            failStatement("here", "- GRIDSQUARE AR09az", [
                [1, 18],
                [1, 19]
            ]);
            failStatement("here", "- GRIDSQUARE AR09ax0A", [
                [1, 20],
                [1, 21]
            ]);
        });

        describe("type POTARefList (well-formed)", function () {
            passStatement("here", "- POTA_REF K-0000", {
                type: "record",
                fields: [["POTA_REF", "K-0000"]]
            });
            passStatement("here", "- POTA_REF K-0000, US-0001", {
                type: "record",
                fields: [["POTA_REF", "K-0000,US-0001"]]
            });
        });
        describe("type POTARefList (ill-formed)", function () {
            failStatement("here", "- POTA_REF K-000A", [
                [1, 12],
                [1, 13]
            ]);
            failStatement("here", "- POTA_REF K-0000, US-000A", [
                [1, 18],
                [1, 19]
            ]);
        });

        describe("shorthand fields", function () {
            passStatement("here", "- 14.074", {
                type: "record",
                fields: [["FREQ", "14.074"]]
            });
            passStatement("here", "- 2025-01-01", {
                type: "record",
                fields: [["QSO_DATE", "20250101"]]
            });
            passStatement("here", "- 1234", {
                type: "record",
                fields: [["TIME_ON", "1234"]]
            });
            passStatement("here", "- W1AW", {
                type: "record",
                fields: [["CALL", "W1AW"]]
            });
            passStatement("here", "- K-0000, US-0001", {
                type: "record",
                fields: [["POTA_REF", "K-0000,US-0001"]]
            });
            passStatement("here", "- 20m", {
                type: "record",
                fields: [["BAND", "20m"]]
            });
            passStatement("here", "- SSB", {
                type: "record",
                fields: [["MODE", "SSB"]]
            });
        });
    });
});

type Location = [
    [startLine: number, startColumn: number],
    [endLine: number, endColumn: number]
];

/**
 * Generate a function to test the parser on a single correct statement with
 * Node assertions.
 *
 *
 * @param from - Load the FAE content under test from `"here"` or from a `"file"`
 * @param content - The FAE content containing the statement
 * @param expected - The expected AST statement
 */
function passStatement(
    from: string,
    content: string,
    expected: Partial<Statement>
) {
    const name = content;
    if (from === "file") content = loadString(content);
    it(`pass "${name}"`, function () {
        const actual = parse(content, {
            name: "input",
            debug: false
        });

        assert.deepStrictEqual(actual.statements.length, 1);
        //@ts-ignore
        assert.partialDeepStrictEqual(actual.statements[0], expected);
    });
}
/**
 * Generate a function to test the parser on a single incorrect statement with
 * Node assertions.
 *
 * @param from - Load the FAE content under test from `"here"` or from a `"file"`
 * @param content - The FAE content containing the statement
 * @param expected - The expected error location
 */
function failStatement(from: string, content: string, expected: Location) {
    const name = content;
    if (from === "file") content = loadString(content);
    it(`fail "${name}"`, function () {
        try {
            parse(content, {
                name: "input",
                debug: false
            });

            assert.fail("No SyntaxError");
        } catch (error) {
            if (!(error instanceof SyntaxError)) throw error;

            //@ts-ignore
            assert.partialDeepStrictEqual(error.location, {
                start: {
                    line: expected[0][0],
                    column: expected[0][1]
                },
                end: {
                    line: expected[1][0],
                    column: expected[1][1]
                }
            });
        }
    });
}

/**
 * Load a string from a file.
 *
 * @param path - The path of the file to load from
 *
 * @return The contents of the file as a string
 */
function loadString(path: string) {
    return fs.readFileSync(path).toString();
}
