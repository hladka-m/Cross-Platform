function PerfumeItem({ perfume, onToggle, onDelete }) {
    return (
        <li
            className={
                !perfume.done
                ? "flex items-center justify-between gap-3 rounded-lg bg-c/60 p-3 transition-colors"
                : "flex items-center justify-between gap-3 rounded-lg bg-lb/40 p-3 transition-colors"
            }
        >
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-1">
                {/* Галочка: перша на десктопі (sm:order-1), але під текстом на мобільному (order-2) */}
                <label className="flex cursor-pointer items-center gap-2.5 text-sm text-db order-2 sm:order-1 sm:mr-4">
                    <input
                        type="checkbox"
                        className="accent-p h-4 w-4 cursor-pointer"
                        checked={perfume.done}
                        onChange={() => onToggle(perfume.id)}
                    />
                    В наявності
                </label>

                {/* Інформація про аромат */}
                <div className="flex flex-col gap-1 order-1 sm:order-2">
                    <span className={!perfume.done ? "wrap-break-word font-bold text-db/60 line-through" : "wrap-break-word font-bold text-db"}>
                        {perfume.text}
                    </span>
                    <span className={!perfume.done ? "text-sm text-b/60" : "text-sm text-b"}>
                        {perfume.brand}
                    </span>
                    <span className={!perfume.done ? "text-sm text-db/60" : "text-sm text-db"}>
                        {perfume.category} · {perfume.volume} мл · {perfume.price} грн
                    </span>
                </div>
            </div>
            <button
                type="button"
                onClick={() => onDelete(perfume.id)}
                className="cursor-pointer rounded-lg bg-rose-500 px-3.5 py-2 text-white hover:bg-rose-700 transition-colors"
            >
                Видалити
            </button>
        </li>
    );
}

export default PerfumeItem;