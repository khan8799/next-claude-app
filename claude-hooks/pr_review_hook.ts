import { execSync } from "child_process";
import fs from "fs";
import path from "path";

type Violation = {
    file: string;
    issue: string;
};

async function main() {
    const chunks = [];

    for await (const chunk of process.stdin) {
        chunks.push(chunk);
    }

    const payload = JSON.parse(
        Buffer.concat(chunks).toString()
    );

    // Only validate PR-related commands
    const command =
        payload.tool_input?.command || "";

    const isPrAction =
        command.includes("git push") ||
        command.includes("gh pr create") ||
        command.includes("git commit");

    if (!isPrAction) {
        process.exit(0);
    }

    const violations: Violation[] = [];

    const rawDiff = execSync(
        "git diff --cached",
        { encoding: "utf8" }
    );

    // Strip hunks that belong to hook/config files to avoid self-flagging
    const diff = filterDiff(rawDiff, ["claude-hooks/", ".claude/"]);

    checkAny(diff, violations);
    checkConsole(diff, violations);
    checkDebugger(diff, violations);
    checkPackageLock(rawDiff, violations);
    // checkTests(violations);

    if (violations.length > 0) {
        console.error("\n❌ PR REVIEW FAILED\n");

        violations.forEach((v) => {
            console.error(
                `• ${v.file}: ${v.issue}`
            );
        });

        process.exit(2);
    }

    process.exit(0);
}

function filterDiff(diff: string, excludePrefixes: string[]): string {
    const lines = diff.split("\n");
    let skip = false;
    return lines.filter((line) => {
        if (line.startsWith("diff --git ")) {
            skip = excludePrefixes.some((p) => line.includes(` b/${p}`));
        }
        return !skip;
    }).join("\n");
}

function checkAny(
    diff: string,
    violations: Violation[]
) {

    const anyRegex =
        /^\+.*:\s*any\b/gm;

    if (
        anyRegex.test(diff)
    ) {
        violations.push({
            file: "multiple",
            issue:
                "Avoid using 'any'."
        });
    }
}

function checkConsole(
    diff: string,
    violations: Violation[]
) {

    const consoleRegex =
        /^\+.*console\./gm;

    if (
        consoleRegex.test(diff)
    ) {
        violations.push({
            file: "multiple",
            issue:
                "Remove console statements before PR."
        });
    }
}

function checkDebugger(
    diff: string,
    violations: Violation[]
) {
    if (
        diff.includes("debugger")
    ) {
        violations.push({
            file: "multiple",
            issue:
                "Debugger statements detected."
        });
    }
}

function checkPackageLock(
    diff: string,
    violations: Violation[]
) {
    if (/^diff --git a\/package-lock\.json/m.test(diff)) {
        violations.push({
            file: "package-lock.json",
            issue: "Verify lock file is npm-generated."
        });
    }
}

function checkTests(
    violations: Violation[]
) {
    const hasTests =
        fs.existsSync(
            path.join(
                process.cwd(),
                "__tests__"
            )
        );

    if (!hasTests) {
        violations.push({
            file: "tests",
            issue:
                "No tests detected."
        });
    }
}

main();