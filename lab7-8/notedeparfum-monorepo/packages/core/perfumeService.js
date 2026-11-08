import { validatePerfumeData } from "./perfumeValidation.js";
import { createPerfume, filterPerfumesByQuery, sanitizePerfumes, sortPerfumesByDate } from "./perfumeUtils.js";

export class PerfumeService {
    constructor(adapter, { now = () => new Date() } = {}) {
        this.adapter = adapter;
        this.now = now;
    }

    // Усі парфуми (за потреби відфільтровані за запитом), спочатку новіші
    async list(query = "") {
        const perfumes = sanitizePerfumes(await this.adapter.load());
        return sortPerfumesByDate(filterPerfumesByQuery(perfumes, query));
    }

    // Додає парфум після перевірки
    async add(data) {
        const validation = validatePerfumeData(data);

        if (!validation.isValid) {
            return { ok: false, error: validation.error };
        }

        const perfumes = sanitizePerfumes(await this.adapter.load());
        const now = this.now();
        const lastId = perfumes.reduce((max, perfume) => Math.max(max, perfume.id), 0);
        
        // id має бути унікальним навіть тоді, коли два записи додано в одну мілісекунду
        const perfume = createPerfume(data, { id: Math.max(now.getTime(), lastId + 1), now });

        await this.adapter.save([...perfumes, perfume]);
        return { ok: true, perfume };
    }

    // Видаляє парфум за id
    async remove(id) {
        const perfumes = sanitizePerfumes(await this.adapter.load());
        const rest = perfumes.filter((perfume) => perfume.id !== id);

        if (rest.length === perfumes.length) {
            return { ok: false, error: "Парфум не знайдено в каталозі." };
        }

        await this.adapter.save(rest);
        return { ok: true };
    }
}