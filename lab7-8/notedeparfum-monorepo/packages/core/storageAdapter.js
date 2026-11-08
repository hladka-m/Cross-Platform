export class PerfumeStorageAdapter {
    // Повертає масив усіх збережених парфумів
    async load() {
        throw new Error("Метод load() не реалізовано");
    }

    // Зберігає масив парфумів повністю
    async save(perfumes) {
        throw new Error("Метод save() не реалізовано");
    }
}

// потрібен для тестів та прототипів, нічого не пише на диск
export class MemoryStorageAdapter extends PerfumeStorageAdapter {
    constructor(initialPerfumes = []) {
        super();
        this.perfumes = [...initialPerfumes];
    }

    async load() {
        return [...this.perfumes];
    }

    async save(perfumes) {
        this.perfumes = [...perfumes];
    }
}