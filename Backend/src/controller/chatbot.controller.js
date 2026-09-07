import crypto from "crypto";
import { Chatbot } from "../models/Chatbot.model.js";
import {
  generateSystemPrompt,
  generateWelcomeMessage,
} from "../services/prompt.service.js";

/**
 * Helper to generate a collision-resistant unique chatbot identifier (e.g. c_7f8a9b2c)
 */
function generateChatbotId() {
  const randomHex = crypto.randomBytes(4).toString("hex");
  const timestamp = Date.now().toString(36).slice(-4);
  return `c_${randomHex}${timestamp}`;
}

/**
 * POST /api/chatbots
 * Create a new customized chatbot based on business details
 */
export async function createChatbot(req, res, next) {
  try {
    const { businessName, category, description, behavior, instructions } = req.body;

    // Generate unique identifier
    let chatbotId = generateChatbotId();
    let exists = await Chatbot.findOne({ chatbotId }).lean();
    let attempts = 0;
    while (exists && attempts < 5) {
      chatbotId = generateChatbotId();
      exists = await Chatbot.findOne({ chatbotId }).lean();
      attempts++;
    }

    // Generate tailored system prompt and initial greeting
    const systemPrompt = generateSystemPrompt({
      businessName,
      category,
      description,
      behavior,
      instructions,
    });

    const welcomeMessage = generateWelcomeMessage({
      businessName,
      category,
    });

    // Save chatbot configuration in MongoDB
    const chatbot = new Chatbot({
      chatbotId,
      businessName,
      category,
      description,
      behavior: behavior || "Helpful, professional, and concise",
      instructions: instructions || "",
      systemPrompt,
      welcomeMessage,
    });

    await chatbot.save();

    console.log(`[Chatbot Created] ID: ${chatbotId} | Business: "${businessName}" (${category})`);

    return res.status(201).json({
      success: true,
      message: "Chatbot created successfully.",
      chatbot: {
        chatbotId: chatbot.chatbotId,
        businessName: chatbot.businessName,
        category: chatbot.category,
        welcomeMessage: chatbot.welcomeMessage,
        url: `/chat/${chatbot.chatbotId}`,
      },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/chatbots/:chatbotId
 * Retrieve public chatbot profile by ID
 */
export async function getChatbotById(req, res, next) {
  try {
    const { chatbotId } = req.params;

    if (!chatbotId || typeof chatbotId !== "string") {
      return res.status(400).json({
        success: false,
        message: "A valid chatbot ID is required.",
      });
    }

    const chatbot = await Chatbot.findOne({ chatbotId: chatbotId.trim() }).lean();

    if (!chatbot) {
      return res.status(404).json({
        success: false,
        message: "Chatbot not found or link has expired.",
      });
    }

    return res.status(200).json({
      success: true,
      chatbot: {
        chatbotId: chatbot.chatbotId,
        businessName: chatbot.businessName,
        category: chatbot.category,
        welcomeMessage: chatbot.welcomeMessage,
        createdAt: chatbot.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
}
