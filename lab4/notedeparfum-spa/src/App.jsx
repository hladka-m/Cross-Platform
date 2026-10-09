import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import PerfumeForm from "./components/PerfumeForm.jsx";
import PerfumeList from "./components/PerfumeList.jsx";

const STORAGE_KEY = "note-de-parfum";

function loadPerfumes() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    } catch {
        return [];
    }
}

function App() {
    const [perfumes, setPerfumes] = useState(loadPerfumes);
    const [message, setMessage] = useState(null);
    const [search, setSearch] = useState("");

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(perfumes));
    }, [perfumes]);

    useEffect(() => {
        if (!message) return;
        const timer = setTimeout(() => {
            setMessage(null);
        }, 3000);
        return () => clearTimeout(timer);
    }, [message]);

    function addPerfume(data) {
        const perfumeName = typeof data === "object" ? data?.name : data;
        const perfumeBrand = typeof data === "object" ? data?.brand : "";
        const category = data?.category || "Унісекс";
        const volume = data?.volume || "50";
        const price = data?.price || 0;

        const cleanName = (perfumeName || "").trim();
        const cleanBrand = (perfumeBrand || "").trim();

        if (!cleanName || !cleanBrand) {
            setMessage({ text: "Введіть назву аромату та бренд.", type: "error" });
            return false;
        }
        if (!price || Number(price) <= 0) {
            setMessage({ text: "Введіть коректну ціну.", type: "error" });
            return false;
        }

        const newPerfume = {
            id: Date.now(),
            text: cleanName,
            brand: cleanBrand,
            category,
            volume,
            price: Number(price),
            done: false,
        };

        setPerfumes((prev) => [...prev, newPerfume]);
        setMessage({ text: "Аромат додано.", type: "success" });
        return true;
    }

    function togglePerfume(id) {
        setPerfumes(
            perfumes.map((p) => (p.id === id ? { ...p, done: !p.done } : p))
        );
    }

    function deletePerfume(id) {
        setPerfumes(perfumes.filter((p) => p.id !== id));
        setMessage({ text: "Аромат видалено.", type: "success" });
    }
    const doneCount = perfumes.filter((p) => p.done).length;

    const query = search.trim().toLowerCase();
    const filteredPerfumes = perfumes.filter(
        (p) =>
            p.text.toLowerCase().includes(query) ||
            p.brand.toLowerCase().includes(query)
    );

    const emptyText = query
        ? "Нічого не знайдено за вашим запитом."
        : "Ароматів поки немає. Додайте перший!";

    return (
        <div className="min-h-screen bg-db px-4 py-8 text-db">
            <main className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-lg">
                <Header total={perfumes.length} done={doneCount} />
                <PerfumeForm onAdd={addPerfume} />

                {message && (
                    <p
                        className={
                            message.type === "error"
                                ? "mb-4 font-bold text-rose-600"
                                : "mb-4 font-bold text-green-300"
                        }
                    >
                        {message.text}
                    </p>
                )}

                <input
                    type="text"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Пошук за назвою чи брендом..."
                    aria-label="Пошук аромату"
                    className="mb-4 w-full rounded-lg border border-b/40 bg-white/50 px-4 py-3 text-base text-db focus:outline-b"
                />

                <PerfumeList
                    perfumes={filteredPerfumes}
                    emptyText={emptyText}
                    onToggle={togglePerfume}
                    onDelete={deletePerfume}
                />
            </main>
        </div>
    );
}

export default App;