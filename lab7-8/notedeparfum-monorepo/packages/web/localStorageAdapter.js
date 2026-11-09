import { PerfumeStorageAdapter } from "@notedeparfum/core";

export const STORAGE_KEY = "notedeparfum-storage";

export class LocalStorageAdapter extends PerfumeStorageAdapter {
    constructor(storage = globalThis.localStorage, key = STORAGE_KEY) {
        super();
        this.storage = storage;
        this.key = key;
    }

    async load() {
        const raw = this.storage.getItem(this.key);
        if (raw === null) {
            return [];
        }
        try {
            const data = JSON.parse(raw);
            return Array.isArray(data) ? data : [];
        } catch {
            return [];
        }
    }

    async save(perfumes) {
        this.storage.setItem(this.key, JSON.stringify(perfumes));
    }
}