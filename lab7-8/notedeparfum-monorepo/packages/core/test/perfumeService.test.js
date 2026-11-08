import { test } from "node:test";
import assert from "node:assert/strict";
import { PerfumeService } from "../perfumeService.js";
import { MemoryStorageAdapter } from "../storageAdapter.js";
import { ERROR_EMPTY_NAME } from "../perfumeValidation.js";

const FIXED_NOW = new Date("2026-11-03T10:00:00.000Z");

function createService(initialPerfumes = []) {
    const adapter = new MemoryStorageAdapter(initialPerfumes);
    return { adapter, service: new PerfumeService(adapter, { now: () => FIXED_NOW }) };
}

test("add зберігає парфум в адаптері", async () => {
    const { adapter, service } = createService();
    const result = await service.add({ name: " Libre ", brand: " YSL ", price: 4500 });
    assert.equal(result.ok, true);
    assert.equal(result.perfume.name, "Libre");
    assert.equal(result.perfume.brand, "YSL");
    assert.equal((await adapter.load()).length, 1);
});

test("add не зберігає некоректний парфум й повертає помилку", async () => {
    const { adapter, service } = createService();
    assert.deepEqual(await service.add({ name: "", brand: "YSL", price: 4500 }), { ok: false, error: ERROR_EMPTY_NAME });
    assert.equal((await adapter.load()).length, 0);
});

test("remove видаляє парфум за id", async () => {
    const { service } = createService([
        { id: 1, name: "Libre", brand: "YSL", price: 4500 },
        { id: 2, name: "Chance", brand: "Chanel", price: 5000 }
    ]);
    assert.deepEqual(await service.remove(1), { ok: true });
    assert.deepEqual((await service.list()).map((p) => p.id), [2]);
});

test("remove повідомляє, якщо парфуму немає", async () => {
    const { service } = createService([{ id: 1, name: "Libre", brand: "YSL", price: 4500 }]);
    assert.equal((await service.remove(99)).ok, false);
});

test("list повертає парфуми від новіших до старіших і підтримує пошук", async () => {
    const { service } = createService([
        { id: 1, name: "Libre", brand: "YSL", price: 4500, createdAt: "2026-01-01T00:00:00.000Z" },
        { id: 2, name: "Chance", brand: "Chanel", price: 5000, createdAt: "2026-06-01T00:00:00.000Z" },
    ]);
    assert.deepEqual((await service.list()).map((p) => p.id), [2, 1]);
    assert.deepEqual((await service.list("Chanel")).map((p) => p.id), [2]);
});