import Perfume from "../models/Perfume.js";

export async function getPerfumes(req, res) { //Отримати всі парфуми
    const perfumes = await Perfume.find();
    res.json(perfumes);
}

export async function getPerfumeById(req, res) { 
    const perfume = await Perfume.findById(req.params.id);
    if (!perfume) {
        return res.status(404).json({ message: "Парфум не знайдено!" });
    }
    res.json(perfume);
}

export async function createPerfume(req, res) {
    const { name, brand, description, price, volume } = req.body;
    const perfume = await Perfume.create({
        name,
        brand,
        description,
        price,
        volume,
    });
    res.status(201).json(perfume);
}

export async function updatePerfume(req, res) {
    const { name, brand, description, price, volume } = req.body;
    const perfume = await Perfume.findByIdAndUpdate(
        req.params.id,
        { name, brand, description, price, volume },
        { returnDocument: "after", runValidators: true }//повертає вже оновлений документ
        //повторно перевіряє нові дані на відповідність правилам Mongoose-схеми
    );
    if (!perfume) {
        return res.status(404).json({ message: "Парфум не знайдено..." });
    }
    res.json(perfume);
}

export async function deletePerfume(req, res) {
    const perfume = await Perfume.findByIdAndDelete(req.params.id);
    if (!perfume) {
        return res.status(404).json({ message: "Парфум не знайдено..." });
    }
    res.json({ message: "Парфум видалено." });
}