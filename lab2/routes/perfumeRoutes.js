import { Router } from "express";
import {
    getPerfumes,
    getPerfumeById,
    createPerfume,
    updatePerfume,
    deletePerfume,
} from "../controllers/perfumeController.js";
import { validatePerfume } from "../middleware/validatePerfume.js";

const router = Router(); //екземпляр маршрутизатора, до якого прив'язуватимемо HTTP-методи та відповідні обробники

router.get("/", getPerfumes);
router.get("/:id", getPerfumeById);
router.post("/", validatePerfume, createPerfume);
router.put("/:id", validatePerfume, updatePerfume);
router.delete("/:id", deletePerfume);

export default router;