import crypto from "crypto";
import { Chatbot } from "../models/Chatbot.model.js";
import {
  generateSystemPrompt,
  generateWelcomeMessage,
} from "../services/prompt.service.js";
import {
  chatbotCache,
  publicProfileCache,
} from "../services/cache.service.js";

/**
 * Helper to generate a collision-resistant unique chatbot identifier (e.g. c_7f8a9b2c3d4e)
 */
function generateChatbotId() {
  const randomHex = crypto.randomBytes(6).toString("hex");
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

    const chatbotId = generateChatbotId();

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

    // Warm in-memory caches immediately for instant client lookup
    const publicProfile = {
      chatbotId: chatbot.chatbotId,
      businessName: chatbot.businessName,
      category: chatbot.category,
      welcomeMessage: chatbot.welcomeMessage,
      createdAt: chatbot.createdAt,
    };

    publicProfileCache.set(chatbotId, publicProfile);
    chatbotCache.set(chatbotId, {
      chatbotId: chatbot.chatbotId,
      systemPrompt: chatbot.systemPrompt,
      businessName: chatbot.businessName,
    });

    console.log(`[Chatbot Created] ID: ${chatbotId} | Business: "${businessName}" (${category})`);

    return res.status(201).json({
      success: true,
      message: "Chatbot created successfully.",
      chatbot: {
        ...publicProfile,
        url: `/chat/${chatbot.chatbotId}`,
      },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/chatbots/:chatbotId
 * Retrieve public chatbot profile by ID (Strict projection with in-memory caching)
 */
export async function getChatbotById(req, res, next) {
  try {
    const { chatbotId } = req.params;

    if (!chatbotId || typeof chatbotId !== "string" || !/^c_[a-zA-Z0-9_-]{4,32}$/.test(chatbotId.trim())) {
      return res.status(400).json({
        success: false,
        message: "A valid chatbot ID is required.",
      });
    }

    const cleanId = chatbotId.trim();

    // Check fast in-memory cache first (0ms DB latency)
    const cachedProfile = publicProfileCache.get(cleanId);
    if (cachedProfile) {
      return res.status(200).json({
        success: true,
        chatbot: cachedProfile,
      });
    }

    // Cache miss: retrieve from MongoDB with minimal projection
    const chatbot = await Chatbot.findOne({ chatbotId: cleanId })
      .select("chatbotId businessName category welcomeMessage createdAt -_id")
      .lean();

    if (!chatbot) {
      return res.status(404).json({
        success: false,
        message: "Chatbot not found or link has expired.",
      });
    }

    const publicData = {
      chatbotId: chatbot.chatbotId,
      businessName: chatbot.businessName,
      category: chatbot.category,
      welcomeMessage: chatbot.welcomeMessage,
      createdAt: chatbot.createdAt,
    };

    // Store in cache for subsequent requests
    publicProfileCache.set(cleanId, publicData);

    return res.status(200).json({
      success: true,
      chatbot: publicData,
    });
  } catch (error) {
    next(error);
  }
}
