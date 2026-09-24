export function validatePerfume(req, res, next) {
    const { name, brand, description, price, volume } = req.body;

    if (!name || !brand || !description || price===undefined || volume===undefined) {
        return res.status(400).json({ message: "Усі поля є обов'язковими!" });
    }

    if (typeof price !== "number" || price < 0) {
        return res.status(400).json({ message: "Ціна повинна бути ДОДАТНИМ ЧИСЛОМ!" });
    }

    if (typeof volume !== "number" || volume <= 0) {
        return res.status(400).json({ message: "Об'єм повинен бути ЧИСЛОМ БІЛЬШЕ 0!" });
    }

    next();
}