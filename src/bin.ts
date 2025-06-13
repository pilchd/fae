#!/usr/bin/env node

import fs from "node:fs";

import {program} from "commander";

import {CompilerError, compile} from "./index.ts";

program
    .name("fae")
    .description("CLI frontend for fae")
    .argument("[string]", "input file")
    .parse();

const input = fs.readFileSync(program.args[0] ?? process.stdin.fd, "utf8");

try {
    for (const line of compile(input).adi) process.stdout.write(line + "\n");
} catch (e) {
    if (e instanceof CompilerError) {
        process.stderr.write(e.format(input, {name: "stdin"}) + "\n");
        process.exit(1);
    }

    throw e;
}
