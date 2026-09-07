import { Router } from "express";
import {
  createChatbot,
  getChatbotById,
} from "../controller/chatbot.controller.js";
import {
  validateBody,
  createChatbotSchema,
} from "../middlewares/validation.middleware.js";
import {
  createChatbotLimiter,
  generalLimiter,
} from "../middlewares/rateLimit.middleware.js";

const router = Router();

// POST /api/chatbots - Create customized chatbot
router.post(
  "/",
  createChatbotLimiter,
  validateBody(createChatbotSchema),
  createChatbot
);

// GET /api/chatbots/:chatbotId - Retrieve public chatbot details
router.get(
  "/:chatbotId",
  generalLimiter,
  getChatbotById
);

export default router;
