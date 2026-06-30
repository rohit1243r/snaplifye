import { Router } from "express";
import {
  register,
  login,
  getProfile,
  updateProfile,
} from "../controllers/clientAuth.controller.js";
import clientAuthMiddleware from "../middlewares/clientAuth.middleware.js";
import { authLimiter } from "../middlewares/rateLimiter.middleware.js";

const router = Router();

router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);
router.get("/profile", clientAuthMiddleware, getProfile);
router.put("/profile", clientAuthMiddleware, updateProfile);

export default router;
