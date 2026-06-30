import { Router } from "express";
import { getDashboard } from "../controllers/clientDashboard.controller.js";
import clientAuthMiddleware from "../middlewares/clientAuth.middleware.js";

const router = Router();

router.get("/", clientAuthMiddleware, getDashboard);

export default router;
