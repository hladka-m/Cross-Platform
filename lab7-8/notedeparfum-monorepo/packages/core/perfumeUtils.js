// Створює об'єкт парфуму зі збереженням дати створення
export function createPerfume(data, { id = Date.now(), now = new Date() } = {}) {
    return {
        id,
        name: data.name ? data.name.trim() : "",
        brand: data.brand ? data.brand.trim() : "",
        price: typeof data.price === "number" ? data.price : parseFloat(data.price) || 0,
        gender: data.gender || "Жіночі",
        volume: data.volume || "50 мл",
        createdAt: now.toISOString()
    };
}

// Форматує дату створення у вигляді дд.мм.рррр. Для некоректної дати повертає порожній рядок
export function formatPerfumeDate(value) {
    const date = value instanceof Date ? value : new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "";
    }

    return date.toLocaleDateString("uk-UA", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
}

// Час створення парфуму: для старих записів без createdAt використовується id (мітка часу)
function getPerfumeTime(perfume) {
    const time = new Date(perfume.createdAt ?? perfume.id).getTime();
    return Number.isNaN(time) ? 0 : time;
}

// Сортування: спочатку новіші записи. Вихідний масив не змінюється
export function sortPerfumesByDate(perfumes) {
    return [...perfumes].sort((a, b) => getPerfumeTime(b) - getPerfumeTime(a));
}

// Пошук за підрядком у назві або бренді парфуму без урахування регістру
export function filterPerfumesByQuery(perfumes, query = "") {
    const normalizedQuery = query.trim().toLowerCase();

    if (normalizedQuery === "") {
        return perfumes;
    }

    return perfumes.filter((perfume) => {
        const nameMatch = perfume.name && perfume.name.toLowerCase().includes(normalizedQuery);
        const brandMatch = perfume.brand && perfume.brand.toLowerCase().includes(normalizedQuery);
        return nameMatch || brandMatch;
    });
}

// Залишає лише коректні записи: об'єкти з числовим id, непорожньою назвою та брендом
export function sanitizePerfumes(perfumes) {
    if (!Array.isArray(perfumes)) {
        return [];
    }

    return perfumes.filter(
        (perfume) =>
            perfume !== null &&
            typeof perfume === "object" &&
            typeof perfume.id === "number" &&
            typeof perfume.name === "string" &&
            perfume.name.trim() !== "" &&
            typeof perfume.brand === "string" &&
            perfume.brand.trim() !== ""
    );
}