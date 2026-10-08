function Header({ total, done }) {
    return (
        <header className="mb-6">
            <h1 className="font-h text-center text-3xl font-bold text-db mb-2">
                Note de Parfum
            </h1>
            <p className="text-center text-db mb-5">
                Усього ароматів: {total} · В наявності: {done}
            </p>
        </header>
    );
}

export default Header;