import Note from "../models/Note.js";

export async function getNotes(req, res) { //повертає список усіх нотаток
    const notes = await Note.find().sort({ createdAt: -1 }); //сортує у зворотному хронологічному порядку (найновіші зверху)
    res.json(notes);
}

export async function getNoteById(req, res) {
    const note = await Note.findById(req.params.id);
    if (!note) {
        return res.status(404).json({ message: "Нотатку не знайдено" });
    }
    res.json(note);
}

export async function createNote(req, res) {
    const { title, content } = req.body;
    const note = await Note.create({ title, content });
    res.status(201).json(note);
}

export async function updateNote(req, res) {
    const { title, content } = req.body;
    const note = await Note.findByIdAndUpdate(
        req.params.id,
        { title, content },
        { new: true, runValidators: true }//повертає вже оновлений документ
        //повторно перевіряє нові дані на відповідність правилам Mongoose-схеми
    );
    if (!note) {
        return res.status(404).json({ message: "Нотатку не знайдено" });
    }
    res.json(note);
}

export async function deleteNote(req, res) {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
        return res.status(404).json({ message: "Нотатку не знайдено" });
    }
    res.json({ message: "Нотатку видалено" });
}