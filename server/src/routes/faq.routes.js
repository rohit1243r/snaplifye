import { Router } from "express";
import {
  getPublicFAQs,
  getAllFAQs,
  getFAQById,
  createFAQ,
  updateFAQ,
  deleteFAQ,
} from "../controllers/faq.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/public", getPublicFAQs);
router.get("/", authMiddleware, getAllFAQs);
router.get("/:id", authMiddleware, getFAQById);
router.post("/", authMiddleware, createFAQ);
router.put("/:id", authMiddleware, updateFAQ);
router.delete("/:id", authMiddleware, deleteFAQ);

export default router;
