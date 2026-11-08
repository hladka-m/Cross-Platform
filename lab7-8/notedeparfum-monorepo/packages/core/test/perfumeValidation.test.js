import { test } from "node:test";
import assert from "node:assert/strict";
import { 
    validatePerfumeData, 
    MAX_NAME_LENGTH, 
    MAX_BRAND_LENGTH, 
    ERROR_EMPTY_NAME, 
    ERROR_EMPTY_BRAND, 
    ERROR_INVALID_PRICE, 
    ERROR_NAME_TOO_LONG, 
    ERROR_BRAND_TOO_LONG 
} from "../perfumeValidation.js";

test("коректні дані парфуму проходять перевірку", () => {
    assert.deepEqual(validatePerfumeData({ name: "Lost Cherry", brand: "Tom Ford", price: 8500 }), { isValid: true, error: null });
});

test("порожня назва або пробіли не проходять перевірку", () => {
    assert.deepEqual(validatePerfumeData({ name: "", brand: "Chanel", price: 5000 }), { isValid: false, error: ERROR_EMPTY_NAME });
    assert.deepEqual(validatePerfumeData({ name: "   ", brand: "Chanel", price: 5000 }), { isValid: false, error: ERROR_EMPTY_NAME });
});

test("порожній бренд або пробіли не проходить перевірку", () => {
    assert.deepEqual(validatePerfumeData({ name: "Chance", brand: "", price: 5000 }), { isValid: false, error: ERROR_EMPTY_BRAND });
    assert.deepEqual(validatePerfumeData({ name: "Chance", brand: "   ", price: 5000 }), { isValid: false, error: ERROR_EMPTY_BRAND });
});

test("некоректна ціна (нуль, від'ємна або не число) не проходить перевірку", () => {
    assert.deepEqual(validatePerfumeData({ name: "Libre", brand: "YSL", price: 0 }), { isValid: false, error: ERROR_INVALID_PRICE });
    assert.deepEqual(validatePerfumeData({ name: "Libre", brand: "YSL", price: -100 }), { isValid: false, error: ERROR_INVALID_PRICE });
    assert.deepEqual(validatePerfumeData({ name: "Libre", brand: "YSL", price: "не ціна" }), { isValid: false, error: ERROR_INVALID_PRICE });
});

test("межа довжини назви: рівно MAX_NAME_LENGTH символів допустимо, на один більше — ні", () => {
    assert.equal(validatePerfumeData({ name: "а".repeat(MAX_NAME_LENGTH), brand: "Brand", price: 1000 }).isValid, true);
    assert.deepEqual(validatePerfumeData({ name: "а".repeat(MAX_NAME_LENGTH + 1), brand: "Brand", price: 1000 }), { isValid: false, error: ERROR_NAME_TOO_LONG });
});

test("межа довжини бренду: рівно MAX_BRAND_LENGTH символів допустимо, на один більше — ні", () => {
    assert.equal(validatePerfumeData({ name: "Perfume", brand: "б".repeat(MAX_BRAND_LENGTH), price: 1000 }).isValid, true);
    assert.deepEqual(validatePerfumeData({ name: "Perfume", brand: "б".repeat(MAX_BRAND_LENGTH + 1), price: 1000 }), { isValid: false, error: ERROR_BRAND_TOO_LONG });
});