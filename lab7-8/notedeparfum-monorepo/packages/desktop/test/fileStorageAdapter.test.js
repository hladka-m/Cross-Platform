import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { PerfumeService } from "@notedeparfum/core";
import { FileStorageAdapter } from "../fileStorageAdapter.js";

async function createTempFile() {
    const dir = await mkdtemp(join(tmpdir(), "notedeparfum-"));
    return join(dir, "data", "perfumes.json");
}

test("load повертає [], якщо файлу немає", async () => {
    const adapter = new FileStorageAdapter(await createTempFile());
    assert.deepEqual(await adapter.load(), []);
});

test("save створює теку та файл, load читає дані назад", async () => {
    const filePath = await createTempFile();
    const adapter = new FileStorageAdapter(filePath);
    const perfumes = [{ id: 1, name: "Lost Cherry", brand: "Tom Ford", price: 8500 }];

    await adapter.save(perfumes);

    assert.deepEqual(JSON.parse(await readFile(filePath, "utf-8")), perfumes);
    assert.deepEqual(await adapter.load(), perfumes);
});

test("load повертає [] для пошкодженого файлу", async () => {
    const filePath = await createTempFile();
    const adapter = new FileStorageAdapter(filePath);
    await adapter.save([]);
    await writeFile(filePath, "{не json", "utf-8");

    assert.deepEqual(await adapter.load(), []);
});

test("адаптер працює зі спільним PerfumeService", async () => {
    const adapter = new FileStorageAdapter(await createTempFile());
    const service = new PerfumeService(adapter);

    const added = await service.add({ name: "Libre", brand: "YSL", price: 4500 });
    assert.equal(added.ok, true);

    // Новий сервіс з тим самим файлом бачить збережені дані
    const reopened = new PerfumeService(new FileStorageAdapter(adapter.filePath));
    assert.equal((await reopened.list()).length, 1);
});