import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import googleAuthRoutes from "./routes/googleAuth.routes.js";
import quoteRoutes from "./routes/quote.routes.js";
import projectRoutes from "./routes/project.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import statsRoutes from "./routes/stats.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import costEstimateRoutes from "./routes/costEstimate.routes.js";
import adminClientRoutes from "./routes/adminClient.routes.js";
import clientAuthRoutes from "./routes/clientAuth.routes.js";
import clientDashboardRoutes from "./routes/clientDashboard.routes.js";
import clientMessageRoutes from "./routes/clientMessage.routes.js";
import clientInvoiceRoutes from "./routes/clientInvoice.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Snaplifye API is running 🚀",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/auth", googleAuthRoutes);
app.use("/api/quotes", quoteRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/dashboard/analytics", analyticsRoutes);
app.use("/api/cost-estimate", costEstimateRoutes);
app.use("/api/admin/clients", adminClientRoutes);
app.use("/api/client/auth", clientAuthRoutes);
app.use("/api/client/dashboard", clientDashboardRoutes);
app.use("/api/client/messages", clientMessageRoutes);
app.use("/api/client/invoices", clientInvoiceRoutes);
export default app;