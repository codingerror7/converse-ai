import { Router } from "express";
import chatbotRoutes from "./chatbot.routes.js";
import chatRoutes from "./chat.routes.js";
import { getDBStatus } from "../config/db.config.js";

const apiRouter = Router();

// Health check endpoint with safe database status
apiRouter.get("/health", (req, res) => {
  const db = getDBStatus();
  res.status(db.isConnected ? 200 : 503).json({
    status: db.isConnected ? "healthy" : "degraded",
    database: db.status,
    service: "converse-ai-backend",
    timestamp: new Date().toISOString(),
  });
});

// Resource routes
apiRouter.use("/chatbots", chatbotRoutes);
apiRouter.use("/chat", chatRoutes);

export default apiRouter;
