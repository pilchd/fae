#!/usr/bin/env node

import * as readline from "node:readline/promises";

import {program} from "commander";

import {compile} from "./index.ts";

program.name("fae").description("CLI frontend for fae");
program.parse();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});
const input: string[] = [];
rl.on("line", line => input.push(line));

rl.once("close", () => {
    try {
        for (const line of compile(input.join("\n"))) {
            console.log(line);
        }
    } catch (e) {
        if (e instanceof SyntaxError) {
            process.stderr.write(e.message + "\n");
            process.exit();
        }
        throw e;
    }
});
