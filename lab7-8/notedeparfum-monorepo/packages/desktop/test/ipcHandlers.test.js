import { test } from "node:test";
import assert from "node:assert/strict";
import { MemoryStorageAdapter, PerfumeService } from "@notedeparfum/core";
import { createHandlers } from "../ipcHandlers.js";

function createTestHandlers(initialPerfumes = []) {
    return createHandlers(new PerfumeService(new MemoryStorageAdapter(initialPerfumes)));
}

test("add і list: парфум з'являється з полем dateLabel", async () => {
    const handlers = createTestHandlers();

    const result = await handlers.add({ name: "Libre", brand: "YSL", price: 4500 });
    const perfumes = await handlers.list("");

    assert.equal(result.ok, true);
    assert.equal(perfumes.length, 1);
    assert.match(perfumes[0].dateLabel, /^\d{2}\.\d{2}\.\d{4}$/);
});

test("add повертає помилку для невалідних даних", async () => {
    const handlers = createTestHandlers();

    assert.equal((await handlers.add({ name: "", brand: "YSL", price: 4500 })).ok, false);
    assert.equal((await handlers.add(42)).ok, false);
    assert.equal((await handlers.add(undefined)).ok, false);
});

test("list ігнорує запит неправильного типу, а рядковий запит фільтрує", async () => {
    const handlers = createTestHandlers([
        { id: 1, name: "Libre", brand: "YSL", price: 4500 },
        { id: 2, name: "Chance", brand: "Chanel", price: 5000 },
    ]);

    assert.equal((await handlers.list({ evil: true })).length, 2);
    assert.equal((await handlers.list("Chanel")).length, 1);
});

test("remove приймає id як число або рядок", async () => {
    const handlers = createTestHandlers([
        { id: 1, name: "Libre", brand: "YSL", price: 4500 },
        { id: 2, name: "Chance", brand: "Chanel", price: 5000 }
    ]);

    assert.equal((await handlers.remove(1)).ok, true);
    assert.equal((await handlers.remove("2")).ok, true);
    assert.equal((await handlers.remove(99)).ok, false);
    assert.deepEqual(await handlers.list(""), []);
});