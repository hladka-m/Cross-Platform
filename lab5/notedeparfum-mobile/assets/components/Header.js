import { StyleSheet, Text, View } from "react-native";

export default function Header({ total, done }) {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.title}>Note de Parfum</Text>
            <Text style={styles.stats}>
                Усього парфумів: {total} · В наявності: {done}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        marginBottom: 24,
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#594e4c",
        textAlign: "center",
        marginBottom: 8,
    },
    stats: {
        fontSize: 16,
        color: "#594e4c",
        textAlign: "center",
        marginBottom: 20,
    },
});