import { formatPerfumeDate } from "@notedeparfum/core";

export function createHandlers(service) {
    return {
        async list(query) {
            const perfumes = await service.list(typeof query === "string" ? query : "");
            return perfumes.map((perfume) => ({ 
                ...perfume, 
                dateLabel: formatPerfumeDate(perfume.createdAt ?? perfume.id) 
            }));
        },

        add(data) {
            return service.add(data);
        },

        remove(id) {
            return service.remove(Number(id));
        },
    };
}