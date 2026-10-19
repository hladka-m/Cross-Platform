import { useState } from "react";
import { Alert, Platform, StatusBar, StyleSheet, TextInput, View, ScrollView } from "react-native";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "./assets/components/Header.js";
import PerfumeForm from "./assets/components/PerfumeForm.js";
import PerfumeList from "./assets/components/PerfumeList.js";

function PerfumeApp() {
  const insets = useSafeAreaInsets();
  const [perfumes, setPerfumes] = useState([]);
  const [search, setSearch] = useState("");

  function addPerfume(data) {
    const perfumeName = typeof data === "object" ? data?.name : data;
    const perfumeBrand = typeof data === "object" ? data?.brand : "";
    const category = data?.category || "Унісекс";
    const volume = data?.volume || "50";
    const price = data?.price || 0;
    const cleanName = (perfumeName || "").trim();
    const cleanBrand = (perfumeBrand || "").trim();

    if (!cleanName || !cleanBrand) {
      Alert.alert("Помилка", "Будь ласка, введіть назву та бренд парфуму.");
      return false;
    }
    if (!price || Number(price) <= 0) {
      Alert.alert("Помилка", "Будь ласка, введіть коректну ціну.");
      return false;
    }
    const newPerfume = {
      id: Date.now().toString(),
      name: cleanName,
      brand: cleanBrand,
      category,
      volume,
      price: Number(price),
      done: false,
    };
    setPerfumes((currentPerfumes) => [newPerfume, ...currentPerfumes]);
    Alert.alert("Успіх", "Парфюм успішно додано.");
    return true;
  }

  function togglePerfume(id) {
    setPerfumes((currentPerfumes) =>
      currentPerfumes.map((p) =>
        p.id === id ? { ...p, done: !p.done } : p
      )
    );
  }

  function deletePerfume(id) {
    setPerfumes((currentPerfumes) => currentPerfumes.filter((perfume) => perfume.id !== id));
    Alert.alert("Видалення", "Парфум видалено зі списку.");
  }

  const doneCount = perfumes.filter((perfume) => !perfume.done).length;

  const query = search.trim().toLowerCase();
  const filteredPerfumes = perfumes.filter(
    (p) =>
      p.name.toLowerCase().includes(query) ||
      p.brand.toLowerCase().includes(query)
  );

  const emptyText = query
    ? "Нічого не знайдено за вашим запитом."
    : "Ароматів поки немає. Додайте перший!";

  const topPadding = Math.max(insets.top, Platform.OS === "ios" ? 50 : 0);

  return (
    <ScrollView 
      style={{ flex: 1, backgroundColor: "#ffffff" }}
      contentContainerStyle={styles.scrollContainer}
      keyboardShouldPersistTaps="handled"
    >
      <View style={[styles.screen, { paddingTop: topPadding }]}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.container}>
          <Header total={perfumes.length} done={doneCount} />
          <PerfumeForm onAdd={addPerfume} />
          <TextInput
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
            placeholder="Пошук за назвою чи брендом..."
            placeholderTextColor="#dec4c9"
          />
          <PerfumeList 
            perfumes={filteredPerfumes} 
            emptyText={emptyText}
            onToggle={togglePerfume} 
            onDelete={deletePerfume} 
          />
        </View>
      </View>
    </ScrollView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <PerfumeApp />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#594e4c",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  searchInput: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#dec4c9",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: "#594e4c",
    marginBottom: 16,
  },
});