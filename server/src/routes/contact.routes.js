import express from "express";

import {
  createContact,
  getAllContacts,
  updateContactStatus,
  deleteContact,
} from "../controllers/contact.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// Public Route
router.post("/", createContact);

// Admin Routes
router.get("/", authMiddleware, getAllContacts);

router.patch(
  "/:id/status",
  authMiddleware,
  updateContactStatus
);

router.delete(
  "/:id",
  authMiddleware,
  deleteContact
);

export default router;