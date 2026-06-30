import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  getClients,
  getClientById,
  sendMessage,
  markMessagesRead,
  createInvoice,
  updateInvoice,
  recordPayment,
  updateProject,
  assignProject,
} from "../controllers/adminClient.controller.js";

const router = Router();

router.use(authMiddleware);

router.get("/", getClients);
router.get("/:id", getClientById);

router.post("/:id/messages", sendMessage);
router.put("/:id/messages/read", markMessagesRead);

router.post("/:id/invoices", createInvoice);
router.put("/:id/invoices/:invoiceId", updateInvoice);

router.post("/:id/payments", recordPayment);

router.put("/:id/projects/:projectId", updateProject);
router.post("/:id/projects", assignProject);

export default router;
