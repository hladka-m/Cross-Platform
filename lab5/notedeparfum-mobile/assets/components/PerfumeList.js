import { FlatList, StyleSheet, Text, View } from "react-native";
import PerfumeItem from "./PerfumeItem";

export default function PerfumeList({ perfumes, onToggle, onDelete }) {
    return (
        <View style={styles.card}>
            <Text style={styles.sectionTitle}>Список парфумів</Text>

            {perfumes.length === 0 ? (
                <Text style={styles.emptyText}>Парфумів поки немає. Додайте перший!</Text>
            ) : (
                <>
                    <Text style={styles.hint}>
                        Торкніться парфуму, щоб змінити статус наявності.
                    </Text>
                    <FlatList
                        data={perfumes}
                        keyExtractor={(item) => item.id.toString()}
                        keyboardShouldPersistTaps="handled"
                        renderItem={({ item }) => (
                            <PerfumeItem 
                                perfume={item} 
                                onToggle={onToggle} 
                                onDelete={onDelete} 
                            />
                        )}
                    />
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: "#ffffff",
        borderRadius: 16,
        padding: 16,
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
    hint: {
        fontSize: 14,
        color: "#977272",
        marginBottom: 12,
    },
    emptyText: {
        color: "#977272",
        fontSize: 16,
        textAlign: "center",
        padding: 10,
    },
});