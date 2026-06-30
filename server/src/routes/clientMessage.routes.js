import { Router } from "express";
import {
  getMessages,
  sendMessage,
  markAsRead,
} from "../controllers/clientMessage.controller.js";
import clientAuthMiddleware from "../middlewares/clientAuth.middleware.js";

const router = Router();

router.get("/", clientAuthMiddleware, getMessages);
router.post("/", clientAuthMiddleware, sendMessage);
router.put("/read", clientAuthMiddleware, markAsRead);

export default router;
