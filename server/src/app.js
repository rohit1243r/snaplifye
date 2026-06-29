import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import quoteRoutes from "./routes/quote.routes.js";
import projectRoutes from "./routes/project.routes.js";
import contactRoutes from "./routes/contact.routes.js";

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
app.use("/api/quotes", quoteRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);
export default app;