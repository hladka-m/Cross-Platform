import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const WEB_DIR = dirname(fileURLToPath(import.meta.url));
const CORE_DIR = dirname(fileURLToPath(import.meta.resolve("@notedeparfum/core")));
const CORE_PREFIX = "/node_modules/@notedeparfum/core/";

const MIME_TYPES = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
};

const WEB_FILES = ["index.html", "style.css", "script.js", "localStorageAdapter.js"];

export function resolveFilePath(urlPath) {
    let pathname;
    try {
        pathname = decodeURIComponent(urlPath.split("?")[0]);
    } catch {
        return null;
    }

    if (pathname.startsWith(CORE_PREFIX)) {
        const fileName = pathname.slice(CORE_PREFIX.length);
        return /^[\w-]+\.js$/.test(fileName) ? join(CORE_DIR, fileName) : null;
    }

    const fileName = pathname === "/" ? "index.html" : pathname.slice(1);
    return WEB_FILES.includes(fileName) ? join(WEB_DIR, fileName) : null;
}

export function createAppServer() {
    return createServer(async (request, response) => {
        const filePath = resolveFilePath(request.url);
        if (!filePath) {
            response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
            response.end("Не знайдено");
            return;
        }
        try {
            const content = await readFile(filePath);
            response.writeHead(200, { "Content-Type": MIME_TYPES[extname(filePath)] });
            response.end(content);
        } catch {
            response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
            response.end("Не знайдено");
        }
    });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const port = Number(process.env.PORT) || 3000;
    createAppServer().listen(port, () => {
        console.log(`Note de Parfum Web: http://localhost:${port}`);
    });
}