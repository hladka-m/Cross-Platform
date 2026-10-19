import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const CATEGORIES = ["Жіночі", "Чоловічі", "Унісекс"];
const VOLUMES = ["30", "50", "100"];

export default function PerfumeForm({ onAdd }) {
    const [text, setText] = useState("");
        const [brand, setBrand] = useState("");
        const [category, setCategory] = useState(CATEGORIES[0]);
        const [volume, setVolume] = useState(VOLUMES[1]);
        const [price, setPrice] = useState("");

    function handleAdd() {
        const added = onAdd({ name: text, brand, category, volume, price });
        if (added) {
            setText("");
            setBrand("");
            setPrice("");
        }
    }

    return (
        <View style={styles.card}>
            <Text style={styles.sectionTitle}>Додати новий парфум</Text>

            <TextInput
                style={styles.input}
                placeholder="Назва аромату..."
                placeholderTextColor="#594e4c"
                value={text}
                onChangeText={setText}
                returnKeyType="next"
            />

            <TextInput
                style={styles.input}
                placeholder="Бренд..."
                placeholderTextColor="#594e4c"
                value={brand}
                onChangeText={setBrand}
                returnKeyType="next"
            />

            {/* Прості кнопки вибору категорії замість select */}
            <Text style={styles.label}>Категорія:</Text>
            <View style={styles.row}>
                {CATEGORIES.map((c) => (
                    <TouchableOpacity
                        key={c}
                        style={[styles.chip, category === c && styles.chipActive]}
                        onPress={() => setCategory(c)}
                    >
                        <Text style={[styles.chipText, category === c && styles.chipTextActive]}>{c}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Вибір об'єму */}
            <Text style={styles.label}>Об'єм (мл):</Text>
            <View style={styles.row}>
                {VOLUMES.map((v) => (
                    <TouchableOpacity
                        key={v}
                        style={[styles.chip, volume === v && styles.chipActive]}
                        onPress={() => setVolume(v)}
                    >
                        <Text style={[styles.chipText, volume === v && styles.chipTextActive]}>{v} мл</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <TextInput
                style={styles.input}
                placeholder="Ціна, грн"
                placeholderTextColor="#594e4c"
                keyboardType="numeric"
                value={price}
                onChangeText={setPrice}
                onSubmitEditing={handleAdd}
                returnKeyType="done"
            />

            <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
                <Text style={styles.addButtonText}>Додати парфум</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#ffffff",
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        shadowColor: "#000000",
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#594e4c",
        marginBottom: 12,
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        color: "#594e4c",
        marginBottom: 6,
    },
    input: {
        borderWidth: 1,
        borderColor: "#dec4c9",
        borderRadius: 10,
        padding: 12,
        fontSize: 16,
        marginBottom: 12,
        backgroundColor: "#fffcfd",
        color: "#594e4c",
    },
    row: {
        flexDirection: "row",
        marginBottom: 12,
        gap: 8,
    },
    chip: {
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#dec4c9",
        alignItems: "center",
        backgroundColor: "#fcf7f8",
    },
    chipActive: {
        backgroundColor: "#594e4c",
        borderColor: "#594e4c",
    },
    chipText: {
        fontSize: 14,
        color: "#594e4c",
    },
    chipTextActive: {
        color: "#ffffff",
        fontWeight: "bold",
    },
    addButton: {
        backgroundColor: "#594e4c",
        padding: 14,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 4,
    },
    addButtonText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
