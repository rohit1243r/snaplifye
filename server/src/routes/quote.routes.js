import express from "express";

import {
  createQuote,
  getAllQuotes,
  updateQuoteStatus,
  deleteQuote,
} from "../controllers/quote.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", createQuote);
router.get("/", authMiddleware, getAllQuotes);

router.patch(
  "/:id/status",
  authMiddleware,
  updateQuoteStatus
);

router.delete(
  "/:id",
  authMiddleware,
  deleteQuote
);
export default router;