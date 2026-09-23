import express from "express";//фреймворк
import cors from "cors";//плагін для крос-доменних запитів
import dotenv from "dotenv";//модуль для зчитування конфігурації

import { connectDB } from "./services/db.js";
import noteRoutes from "./routes/noteRoutes.js";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());

// Логуємо кожен вхідний запит: метод і адресу
app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});

app.get("/", (req, res) => {
    res.send("Сервер працює!");
});

app.use("/api/notes", noteRoutes);

connectDB(process.env.MONGO_URI).catch((err) =>
    console.error("Помилка підключення до MongoDB:", err)
);

app.listen(PORT, () => {
    console.log(`Сервер запущено на порті ${PORT}`);
});