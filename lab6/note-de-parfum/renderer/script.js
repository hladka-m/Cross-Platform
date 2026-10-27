const perfumeNameInput = document.getElementById("perfumeNameInput");
const perfumeBrandInput = document.getElementById("perfumeBrandInput");
const perfumePriceInput = document.getElementById("perfumePriceInput");
const addPerfumeButton = document.getElementById("addPerfumeButton");
const perfumesList = document.getElementById("perfumesList");
const message = document.getElementById("message");

let perfumes = [];
let messageTimeout;

function showMessage(text, color) {
    message.textContent = text;
    message.style.color = color;
    clearTimeout(messageTimeout);
    messageTimeout = setTimeout(() => {
        message.textContent = "";
    }, 2000);
}

function renderPerfumes() {
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
        brandSpan.textContent = perfume.brand;
        const detailsSpan = document.createElement("span");
        detailsSpan.className = "perfume-details";
        detailsSpan.textContent = `${perfume.gender} · ${perfume.volume}`;
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
            perfumes = perfumes.filter((item) => item.id !== perfume.id);
            renderPerfumes();
            await window.perfumesAPI.savePerfumes(perfumes);
            showMessage("Парфум видалено з каталогу.", "#ef4444");
        });

        perfumeItem.appendChild(infoDiv);
        perfumeItem.appendChild(deleteButton);
        perfumesList.appendChild(perfumeItem);
    });
}

async function addPerfume() {
    const name = perfumeNameInput.value.trim();
    const brand = perfumeBrandInput.value.trim();
    const price = parseFloat(perfumePriceInput.value.trim());
    const genderElement = document.querySelector('input[name="gender"]:checked');
    const volumeElement = document.querySelector('input[name="volume"]:checked');

    if (name === "" || brand === "" || price === "") {
        showMessage("Будь ласка, заповніть усі поля форми.", "#ef4444");
        return;
    }

    const newPerfume = {
        id: Date.now(),
        name,
        brand,
        price,
        gender: genderElement ? genderElement.value : "Жіночий",
        volume: volumeElement ? volumeElement.value : "50 мл"
    };

    perfumes.push(newPerfume);
    
    perfumeNameInput.value = "";
    perfumeBrandInput.value = "";
    perfumePriceInput.value = "";
    
    renderPerfumes();

    await window.perfumesAPI.savePerfumes(perfumes);
    showMessage("Парфум успішно додано та збережено у файл.", "#16a34a");
}

addPerfumeButton.addEventListener("click", addPerfume);

perfumeNameInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addPerfume();
    }
});

window.addEventListener("DOMContentLoaded", async () => {
    perfumes = await window.perfumesAPI.loadPerfumes();
    renderPerfumes();
});