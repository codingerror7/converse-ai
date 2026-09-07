import { Router } from "express";
import { sendChatMessage } from "../controller/chat.controller.js";
import {
  validateBody,
  chatMessageSchema,
} from "../middlewares/validation.middleware.js";
import { chatLimiter } from "../middlewares/rateLimit.middleware.js";

const router = Router();

// POST /api/chat - Send message to chatbot
router.post(
  "/",
  chatLimiter,
  validateBody(chatMessageSchema),
  sendChatMessage
);

export default router;
