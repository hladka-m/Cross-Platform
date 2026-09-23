import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true, // поле є обов'язковим
            trim: true, // видаляє зайві пробіли на початку та в кінці рядка
        },
            content: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { timestamps: true } // автоматично додає до кожного документа два поля: createdAt (дата створення) та updatedAt (дата зміни)
);

const Note = mongoose.model("Note", noteSchema);

export default Note;