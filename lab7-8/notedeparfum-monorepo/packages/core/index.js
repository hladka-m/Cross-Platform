// реекспортує все публічне API пакета: клієнти імпортують лише з "@notedeparfum/core", а не з окремих файлів
export {
    MAX_NAME_LENGTH,
    MAX_BRAND_LENGTH,
    ERROR_EMPTY_NAME,
    ERROR_EMPTY_BRAND,
    ERROR_INVALID_PRICE,
    ERROR_NAME_TOO_LONG,
    ERROR_BRAND_TOO_LONG,
    validatePerfumeData,
} from "./perfumeValidation.js";

export {
    createPerfume,
    formatPerfumeDate,
    sortPerfumesByDate,
    filterPerfumesByQuery,
    sanitizePerfumes,
} from "./perfumeUtils.js";

export { PerfumeStorageAdapter, MemoryStorageAdapter } from "./storageAdapter.js";
export { PerfumeService } from "./perfumeService.js";