import path from "path";

async function main() {
    const chunks = [];

    for await (const chunk of process.stdin) {
        chunks.push(chunk);
    }

    const payload = JSON.parse(
        Buffer.concat(chunks).toString()
    );

    const tool = payload.tool_name;

    const filePath =
        payload.tool_input?.file_path ||
        payload.tool_input?.path ||
        "";

    const normalized =
        path.normalize(filePath).toLowerCase();

    const fileName =
        path.basename(normalized);

    const isBlocked =
        fileName === ".env" ||
        fileName.startsWith(".env.");

    if (isBlocked) {
        console.error(
            `${tool}: access to env files is blocked`
        );
        process.exit(2);
    }

    process.exit(0);
}

main();