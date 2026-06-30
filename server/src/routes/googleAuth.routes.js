import { Router } from "express";
import { googleLogin } from "../controllers/googleAuth.controller.js";

const router = Router();

router.post("/google", googleLogin);

export default router;
