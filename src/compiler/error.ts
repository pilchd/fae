import chalk from "chalk";

import {
    type OrArray,
    between,
    context,
    digits,
    lineate,
    splines,
    strfranges
} from "../util.ts";

export class CompilerError extends Error {
    constructor({
        message,
        type,
        locator,
        hint
    }: {
        message: string;
        type: string;
        locator?: OrArray<{start: number; end: number}>;
        hint?: string;
    }) {
        super(message);
        this.name = "CompilerError";

        this.type = type;
        this.locator = locator ? [locator].flat() : [];
        this.hint = hint;
    }

    format(
        source: string,
        {
            name = "anonymous"
        }: {
            /**
             * The path or other friendly name of the input (for rendering errors)
             */
            name: string;
        }
    ) {
        const result: string[] = [];
        function p(string: string) {
            result.push(string);
        }

        // type
        p(`${chalk.red.bold(this.type)} ${chalk.red("error")}`);

        // message
        p(`: ${this.message}`);

        // locator
        // <🍝>
        if (this.locator.length) {
            p("\n\n");
            const lines = splines(
                strfranges(
                    source,
                    this.locator.map(locator => ({
                        at: locator.start,
                        to: locator.end,
                        fn: chalk.bold.red
                    }))
                )
            );
            const affected = this.locator.reduce((pv, cv) => {
                between(
                    lineate(source, cv.start)[0],
                    lineate(source, cv.end - 1)[0]
                ).forEach(num => pv.add(num));
                return pv;
            }, new Set<number>());
            const contexted = affected
                .values()
                .reduce(
                    (pv, cv) =>
                        between(
                            ...context(cv, 2, [0, lines.length - 1])
                        ).reduce((pv, cv) => pv.add(cv), pv),
                    new Set<number>()
                );

            const ndigits = digits(
                Math.max(...contexted.values().map(val => val + 1))
            );

            let inrange: boolean | null = null;
            lines.forEach((line, idx) => {
                const pidx = (idx + 1).toString().padStart(ndigits);
                if (contexted.has(idx)) {
                    if (inrange === false) {
                        p("...\n");
                    }
                    p(
                        `${affected.has(idx) ? chalk.bold.red(pidx) : pidx} | ${line}`
                    );
                    inrange = true;
                } else if (inrange === true) {
                    inrange = false;
                }
            });
            // </🍝>

            p("\n");

            p(
                this.locator
                    .map(loc => {
                        const at = lineate(source, loc.start);
                        const to = lineate(source, loc.end);

                        return chalk.italic.gray(
                            `${name}:${at[0] + 1}:${at[1] + 1} (${to[0] + 1}:${to[1] + 1})`
                        );
                    })
                    .join("\n")
            );
        }

        // hint
        if (this.hint) {
            if (this.locator.length) p("\n");
            p("\n");

            p(chalk.italic.gray(`${chalk.blue.bold("hint:")} ${this.hint}`));
        }

        return result.join("");
    }

    type: string;
    locator: {start: number; end: number}[];
    hint?: string;
}
