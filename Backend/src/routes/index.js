import { Router } from "express";
import chatbotRoutes from "./chatbot.routes.js";
import chatRoutes from "./chat.routes.js";

const apiRouter = Router();

// Health check endpoint
apiRouter.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    service: "converse-ai-backend",
    timestamp: new Date().toISOString(),
  });
});

// Resource routes
apiRouter.use("/chatbots", chatbotRoutes);
apiRouter.use("/chat", chatRoutes);

export default apiRouter;
