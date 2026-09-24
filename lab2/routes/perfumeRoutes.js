import { Router } from "express";
import {
    getNotes,
    getNoteById,
    createNote,
    updateNote,
    deleteNote,
} from "../controllers/noteController.js";
import { validateNote } from "../middleware/validateNote.js";

const router = Router(); //екземпляр маршрутизатора, до якого прив'язуватимемо HTTP-методи та відповідні обробники

router.get("/", getNotes);
router.get("/:id", getNoteById);
router.post("/", validateNote, createNote);
router.put("/:id", validateNote, updateNote);
router.delete("/:id", deleteNote);

export default router;