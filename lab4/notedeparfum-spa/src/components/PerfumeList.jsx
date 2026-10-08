import PerfumeItem from "./PerfumeItem.jsx";

function PerfumeList({ perfumes, emptyText, onToggle, onDelete }) {
    if (perfumes.length === 0) {
        return <p className="text-center text-b">{emptyText}</p>;
    }

    return (
        <ul className="space-y-3">
            {perfumes.map((perfume) => (
                <PerfumeItem
                    key={perfume.id}
                    perfume={perfume}
                    onToggle={onToggle}
                    onDelete={onDelete}
                />
            ))}
        </ul>
    );
}

export default PerfumeList;