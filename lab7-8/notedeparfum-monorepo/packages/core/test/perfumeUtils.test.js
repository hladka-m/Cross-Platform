import { test } from "node:test";
import assert from "node:assert/strict";
import { createPerfume, formatPerfumeDate, sortPerfumesByDate, filterPerfumesByQuery, sanitizePerfumes } from "../perfumeUtils.js";

test("createPerfume обрізає пробіли у назві та бренді й зберігає дату створення", () => {
    const now = new Date("2026-11-03T10:00:00.000Z");
    assert.deepEqual(createPerfume({ name: "  Lost Cherry  ", brand: " Tom Ford ", price: "8500" }, { id: 7, now }), {
        id: 7,
        name: "Lost Cherry",
        brand: "Tom Ford",
        price: 8500,
        gender: "Жіночі",
        volume: "50 мл",
        createdAt: "2026-11-03T10:00:00.000Z",
    });
});

test("formatPerfumeDate форматує дату як дд.мм.рррр", () => {
    assert.equal(formatPerfumeDate(new Date(2026, 10, 3, 12, 0)), "03.11.2026");
});

test("formatPerfumeDate повертає порожній рядок для некоректної дати", () => {
    assert.equal(formatPerfumeDate("не дата"), "");
});

test("sortPerfumesByDate ставить новіші парфуми першими й не змінює вихідний масив", () => {
    const perfumes = [
        { id: 1, name: "Старий", brand: "A", createdAt: "2026-01-01T00:00:00.000Z" },
        { id: 2, name: "Новий", brand: "B", createdAt: "2026-06-01T00:00:00.000Z" },
    ];
    const sorted = sortPerfumesByDate(perfumes);
    assert.deepEqual(sorted.map((p) => p.id), [2, 1]);
    assert.deepEqual(perfumes.map((p) => p.id), [1, 2]);
});

test("filterPerfumesByQuery шукає за назвою або брендом без урахування регістру", () => {
    const perfumes = [
        { id: 1, name: "Lost Cherry", brand: "Tom Ford" },
        { id: 2, name: "Chance", brand: "Chanel" },
    ];
    assert.deepEqual(filterPerfumesByQuery(perfumes, "tom ford"), [perfumes[0]]);
    assert.deepEqual(filterPerfumesByQuery(perfumes, "chance"), [perfumes[1]]);
    assert.deepEqual(filterPerfumesByQuery(perfumes, "   "), perfumes);
});

test("sanitizePerfumes відкидає некоректні записи", () => {
    const perfumes = [
        { id: 1, name: "Ок", brand: "Brand", price: 100 },
        { id: "2", name: "ID не число", brand: "Brand", price: 100 },
        { id: 3, name: "", brand: "Brand", price: 100 },
        null,
    ];
    assert.deepEqual(sanitizePerfumes(perfumes), [{ id: 1, name: "Ок", brand: "Brand", price: 100 }]);
});