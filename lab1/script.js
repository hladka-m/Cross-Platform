const userNameInput = document.getElementById('userNameInput');
const perfumeSelect = document.getElementById('perfumeSelect');
const reviewTextInput = document.getElementById("reviewTextInput");
const addReviewButton = document.getElementById("addReviewButton");
const reviewList = document.getElementById("reviewList");
const message = document.getElementById("message");
let messageTimeout;

function showMessage(text, color) {
    clearTimeout(messageTimeout);
    message.textContent = text;
    message.style.color = color;
    messageTimeout = setTimeout(function () {
        message.textContent = "";
    }, 3000);
}

function createReviewElement(name, perfume, reviewText, rating) {
    const li = document.createElement("li");
    li.className = "review-item";
    const textSpan = document.createElement("span");
    textSpan.className = "review-text-content";
    let content = `<strong>${name}</strong> про <em>"${perfume}"</em> — Оцінка: ${rating}/5`;
    if (reviewText !== "") {
        content += `<br><small>"${reviewText}"</small>`;
    } else {
        content += `<br><small style="color: rgb(0 0 0 / 0.28)">(без текстового коментаря)</small>`;
    }
    textSpan.innerHTML = content;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Видалити";
    deleteButton.addEventListener("click", function () {
        li.remove();
        showMessage("Оцінку видалено зі списку.", "#ac1b16");
    });

    li.appendChild(textSpan);
    li.appendChild(deleteButton);
    return li;
}

function addReview() {
    const name = userNameInput.value.trim() || "Анонім";
    const perfume = perfumeSelect.value;
    const reviewText = reviewTextInput.value.trim();

    const selectedRating = document.querySelector('input[name="rating"]:checked');

    if (perfume === "") {
        showMessage("Будь ласка, оберіть парфум із списку!", "#ac1b16");
        return;
    }
    const ratingValue = selectedRating ? selectedRating.value : "5";
    const reviewElement = createReviewElement(name, perfume, reviewText, ratingValue);

    reviewList.appendChild(reviewElement);
    userNameInput.value = "";
    perfumeSelect.value = "";
    reviewTextInput.value = "";
    showMessage("Дякуємо! Вашу оцінку успішно додано.", "#46df7f");
}

addReviewButton.addEventListener("click", addReview);
