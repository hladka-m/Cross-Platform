import mongoose from "mongoose";

const perfumeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Назва парфуму обов'язкова!"], // поле є обов'язковим
            trim: true, // видаляє зайві пробіли на початку та в кінці рядка
        },
        brand: {
            type: String,
            required: [true, "Назва бренду обов'язкова!"],
            trim: true, 
        },
        description: {
            type: String,
            required: [true, "Опис аромату обов'язковий!"], 
            trim: true, 
        },
        price: {
            type: Number,
            required: [true, "Ціна товару обов'язкова!"], 
        },
        volume: {
            type: Number,
            required: [true, "Назва парфуму обов'язкова!"], 
            min: [1, "Об'єм має бути більше 0!"],
        },
    },
    { timestamps: true } // автоматично додає до кожного документа два поля: createdAt (дата створення) та updatedAt (дата зміни)
);

const Perfume = mongoose.model("Perfume", perfumeSchema);

export default Perfume;