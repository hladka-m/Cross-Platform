import { useState } from "react";

const CATEGORIES = ["Жіночі", "Чоловічі", "Унісекс"];
const VOLUMES = ["30", "50", "100"];

function PerfumeForm({ onAdd }) {
    const [text, setText] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState(CATEGORIES[0]);
    const [volume, setVolume] = useState(VOLUMES[1]);
    const [price, setPrice] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        const added = onAdd({ name: text, brand, category, volume, price });
        if (added) {
            setText("");
            setBrand("");
            setPrice("");
        }
    }

    const fieldClass =
        "w-full rounded-lg border border-b/40 bg-white/50 px-4 py-3 text-base text-db focus:outline-b";

    return (
        <form
            onSubmit={handleSubmit}
            className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2"
        >
            <input
                type="text"
                value={text}
                onChange={(event) => setText(event.target.value)}
                placeholder="Назва аромату..."
                aria-label="Назва аромату"
                className={fieldClass}
            />
            <input
                type="text"
                value={brand}
                onChange={(event) => setBrand(event.target.value)}
                placeholder="Бренд..."
                aria-label="Бренд"
                className={fieldClass}
            />
            <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                aria-label="Категорія"
                className={fieldClass}
            >
                {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                        {c}
                    </option>
                ))}
            </select>
            <select
                value={volume}
                onChange={(event) => setVolume(event.target.value)}
                aria-label="Об'єм"
                className={fieldClass}
            >
                {VOLUMES.map((v) => (
                    <option key={v} value={v}>
                        {v} мл
                    </option>
                ))}
            </select>
            <input
                type="number"
                min="0"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                placeholder="Ціна, грн"
                aria-label="Ціна"
                className={fieldClass}
            />
            <button
                type="submit"
                className="cursor-pointer rounded-lg bg-db px-5 py-3 text-base text-white hover:bg-b transition-colors"
            >
                Додати
            </button>
        </form>
    );
}

export default PerfumeForm;