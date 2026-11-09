import { test } from "node:test";
import assert from "node:assert/strict";
import { PerfumeService } from "@notedeparfum/core";
import { LocalStorageAdapter, STORAGE_KEY } from "../localStorageAdapter.js";

// Імітація localStorage: у Node.js його немає, тому підставляємо простий об'єкт
function createFakeStorage(initial = {}) {
    const data = { ...initial };
    return {
        data,
        getItem: (key) => (key in data ? data[key] : null),
        setItem: (key, value) => {
            data[key] = String(value);
        },
    };
}

test("load повертає порожній масив, якщо сховище порожнє", async () => {
    const adapter = new LocalStorageAdapter(createFakeStorage());
    assert.deepEqual(await adapter.load(), []);
});

test("save записує JSON, а load читає його назад", async () => {
    const storage = createFakeStorage();
    const adapter = new LocalStorageAdapter(storage);
    const perfumes = [{ id: 1, name: "Lost Cherry", brand: "Tom Ford", price: 8500 }];

    await adapter.save(perfumes);

    assert.equal(storage.data[STORAGE_KEY], JSON.stringify(perfumes));
    assert.deepEqual(await adapter.load(), perfumes);
});

test("load повертає [] для пошкодженого JSON та для не-масиву", async () => {
    const broken = new LocalStorageAdapter(createFakeStorage({ [STORAGE_KEY]: "{не json" }));
    const notArray = new LocalStorageAdapter(createFakeStorage({ [STORAGE_KEY]: '{"a":1}' }));

    assert.deepEqual(await broken.load(), []);
    assert.deepEqual(await notArray.load(), []);
});

test("адаптер працює зі спільним PerfumeService", async () => {
    const service = new PerfumeService(new LocalStorageAdapter(createFakeStorage()));

    const added = await service.add({ name: " Libre ", brand: " YSL ", price: 4500 });
    assert.equal(added.ok, true);
    assert.equal((await service.list()).length, 1);

    const removed = await service.remove(added.perfume.id);
    assert.equal(removed.ok, true);
    assert.deepEqual(await service.list(), []);
});