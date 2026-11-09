import { PerfumeService, formatPerfumeDate } from "@notedeparfum/core";
import { LocalStorageAdapter } from "./localStorageAdapter.js";

const service = new PerfumeService(new LocalStorageAdapter());

const perfumeNameInput = document.getElementById("perfumeNameInput");
const perfumeBrandInput = document.getElementById("perfumeBrandInput");
const perfumePriceInput = document.getElementById("perfumePriceInput");
const addPerfumeButton = document.getElementById("addPerfumeButton");
const searchInput = document.getElementById("searchInput");
const perfumesList = document.getElementById("perfumesList");
const message = document.getElementById("message");

let messageTimeout;

function showMessage(text, color) {
    message.textContent = text;
    message.style.color = color;
    clearTimeout(messageTimeout);
    messageTimeout = setTimeout(() => {
        message.textContent = "";
    }, 2000);
}

async function renderPerfumes() {
    const query = searchInput ? searchInput.value : "";
    const perfumes = await service.list(query);
    perfumesList.innerHTML = "";

    if (perfumes.length === 0) {
        perfumesList.innerHTML = '<p class="empty-message">Парфумів поки немає. Додайте перший!</p>';
        return;
    }

    perfumes.forEach((perfume) => {
        const perfumeItem = document.createElement("li");
        perfumeItem.className = "perfume-item";

        const infoDiv = document.createElement("div");
        infoDiv.className = "perfume-info";

        const titleSpan = document.createElement("span");
        titleSpan.className = "perfume-title";
        titleSpan.textContent = perfume.name;

        const brandSpan = document.createElement("span");
        brandSpan.className = "perfume-brand";
        brandSpan.textContent = `Бренд: ${perfume.brand}`;

        const detailsSpan = document.createElement("span");
        detailsSpan.className = "perfume-details";
        const formattedDate = formatPerfumeDate(perfume.createdAt ?? perfume.id);
        detailsSpan.textContent = `${perfume.gender} · ${perfume.volume}${formattedDate ? ` · Додано: ${formattedDate}` : ""}`;

        const priceSpan = document.createElement("span");
        priceSpan.className = "perfume-price";
        priceSpan.textContent = `${perfume.price} грн`;

        infoDiv.appendChild(titleSpan);
        infoDiv.appendChild(brandSpan);
        infoDiv.appendChild(detailsSpan);
        infoDiv.appendChild(priceSpan);

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.textContent = "Видалити";
        deleteButton.addEventListener("click", async () => {
            await service.remove(perfume.id);
            await renderPerfumes();
            showMessage("Парфум видалено з каталогу.", "#ef4444");
        });

        perfumeItem.appendChild(infoDiv);
        perfumeItem.appendChild(deleteButton);
        perfumesList.appendChild(perfumeItem);
    });
}

async function addPerfume() {
    const name = perfumeNameInput ? perfumeNameInput.value : "";
    const brand = perfumeBrandInput ? perfumeBrandInput.value : "";
    const price = perfumePriceInput ? perfumePriceInput.value : "";
    const genderElement = document.querySelector('input[name="gender"]:checked');
    const volumeElement = document.querySelector('input[name="volume"]:checked');

    // Зверни увагу: жодної власної перевірки тут немає — помилку повертає ядро через service.add()
    const result = await service.add({
        name,
        brand,
        price: price === "" ? NaN : Number(price),
        gender: genderElement ? genderElement.value : "Жіночі",
        volume: volumeElement ? volumeElement.value : "50 мл"
    });

    if (!result.ok) {
        showMessage(result.error, "#ef4444");
        return;
    }

    if (perfumeNameInput) perfumeNameInput.value = "";
    if (perfumeBrandInput) perfumeBrandInput.value = "";
    if (perfumePriceInput) perfumePriceInput.value = "";

    await renderPerfumes();
    showMessage("Парфум успішно додано до каталогу!", "#16a34a");
}

if (addPerfumeButton) {
    addPerfumeButton.addEventListener("click", addPerfume);
}

if (perfumeNameInput) {
    perfumeNameInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            addPerfume();
        }
    });
}

if (searchInput) {
    searchInput.addEventListener("input", renderPerfumes);
}

renderPerfumes();