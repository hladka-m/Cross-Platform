export const MAX_NAME_LENGTH = 100;
export const MAX_BRAND_LENGTH = 100;

export const ERROR_EMPTY_NAME = "Будь ласка, введіть назву парфуму.";
export const ERROR_EMPTY_BRAND = "Будь ласка, введіть бренд парфуму.";
export const ERROR_INVALID_PRICE = "Будь ласка, введіть коректну ціну (більшу за 0).";
export const ERROR_NAME_TOO_LONG = `Назва парфуму не повинна перевищувати ${MAX_NAME_LENGTH} символів.`;
export const ERROR_BRAND_TOO_LONG = `Назва бренду не повинна перевищувати ${MAX_BRAND_LENGTH} символів.`;

export function validatePerfumeData(data) {
    const name = data && typeof data.name === "string" ? data.name.trim() : "";
    const brand = data && typeof data.brand === "string" ? data.brand.trim() : "";
    const price = data && (typeof data.price === "number" ? data.price : parseFloat(data.price));

    if (name === "") {
        return { isValid: false, error: ERROR_EMPTY_NAME };
    }

    if (name.length > MAX_NAME_LENGTH) {
        return { isValid: false, error: ERROR_NAME_TOO_LONG };
    }

    if (brand === "") {
        return { isValid: false, error: ERROR_EMPTY_BRAND };
    }

    if (brand.length > MAX_BRAND_LENGTH) {
        return { isValid: false, error: ERROR_BRAND_TOO_LONG };
    }

    if (Number.isNaN(price) || price <= 0) {
        return { isValid: false, error: ERROR_INVALID_PRICE };
    }

    return { isValid: true, error: null };
}