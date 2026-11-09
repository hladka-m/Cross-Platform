import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { PerfumeStorageAdapter } from "@notedeparfum/core";

export class FileStorageAdapter extends PerfumeStorageAdapter {
    constructor(filePath) {
        super();
        this.filePath = filePath;
    }

    async load() {
        try {
            const data = JSON.parse(await readFile(this.filePath, "utf-8"));
            return Array.isArray(data) ? data : [];
        } catch {
            return [];
        }
    }

    async save(perfumes) {
        await mkdir(dirname(this.filePath), { recursive: true });
        await writeFile(this.filePath, JSON.stringify(perfumes, null, 2), "utf-8");
    }
}