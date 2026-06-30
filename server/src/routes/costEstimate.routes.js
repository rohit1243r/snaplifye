import express from "express";
import { calculateEstimate } from "../controllers/costEstimate.controller.js";

const router = express.Router();

router.post("/", calculateEstimate);

export default router;
