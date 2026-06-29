import express from "express";

import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/project.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// Public Routes
router.get("/", getAllProjects);
router.get("/:id", getProjectById);

// Admin Routes
router.post("/", authMiddleware, createProject);
router.put("/:id", authMiddleware, updateProject);
router.delete("/:id", authMiddleware, deleteProject);

export default router;