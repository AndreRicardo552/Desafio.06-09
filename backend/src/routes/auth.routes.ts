import { Router } from "express";
import { login, me } from "../controllers/auth.controller";
import { requireToken } from "../middlewares/auth.middleware";

const router = Router();

router.post("/login", login);
router.get("/me", requireToken, me);

export default router;
