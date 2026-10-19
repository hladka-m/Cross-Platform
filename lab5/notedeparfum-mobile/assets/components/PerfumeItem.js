import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function PerfumeItem({ perfume, onToggle, onDelete }) {
    return (
        <View style={[styles.item, perfume.done && styles.itemDone]}>
        <TouchableOpacity
            style={styles.textArea}
            onPress={() => onToggle(perfume.id)}
        >
            <Text style={[styles.nameText, perfume.done && styles.textDone]}>
                {perfume.name}
            </Text>
            <Text style={[styles.brandText, perfume.done && styles.textDone]}>
                {perfume.brand}
            </Text>
            <Text style={[styles.detailsText, perfume.done && styles.textDone]}>
                {perfume.category} · {perfume.volume} мл
            </Text>
            <Text style={styles.price}>
                {perfume.price} грн
            </Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => onDelete(perfume.id)}
        >
            <Text style={styles.deleteButtonText}>Видалити</Text>
        </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        backgroundColor: "#f2e5e8",
        padding: 12,
        borderRadius: 10,
        marginBottom: 10,
    },
    itemDone: {
        backgroundColor: "#dec4c9",
    },
    textArea: {
        flex: 1,
    },
    nameText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#594e4c",
        marginBottom: 2,
    },
    brandText: {
        fontSize: 14,
        color: "#977272",
        marginBottom: 2,
    },
    detailsText: {
        fontSize: 13,
        color: "#594e4c",
    },
    price: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#977272",
        marginTop: 6,
    },
    textDone: {
        color: "#594e4c",
        textDecorationLine: "line-through",
        opacity: 0.7,
    },
    deleteButton: {
        backgroundColor: "#ef1444",
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 8,
    },
    deleteButtonText: {
        color: "#ffffff",
        fontWeight: "bold",
        fontSize: 14,
    },
});