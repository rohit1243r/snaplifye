import { Router } from "express";
import {
  getInvoices,
  getPayments,
} from "../controllers/clientInvoice.controller.js";
import clientAuthMiddleware from "../middlewares/clientAuth.middleware.js";

const router = Router();

router.get("/", clientAuthMiddleware, getInvoices);
router.get("/payments", clientAuthMiddleware, getPayments);

export default router;
