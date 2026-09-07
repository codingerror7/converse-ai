import { Chatbot } from "../models/Chatbot.model.js";
import { generateChatResponse } from "../services/openai.service.js";
import { chatbotCache } from "../services/cache.service.js";

/**
 * POST /api/chat
 * Process a user message and return the AI assistant's contextual response.
 * Uses in-memory cache to eliminate repeated MongoDB reads during active chat sessions.
 */
export async function sendChatMessage(req, res, next) {
  try {
    const { chatbotId, message, conversationHistory } = req.body;
    const cleanId = chatbotId.trim();

    // Check fast in-memory cache first (0ms DB read)
    let chatbotData = chatbotCache.get(cleanId);

    if (!chatbotData) {
      // Cache miss: retrieve chatbot from MongoDB (minimal lean projection)
      const chatbotDoc = await Chatbot.findOne({ chatbotId: cleanId })
        .select("chatbotId systemPrompt businessName")
        .lean();

      if (!chatbotDoc) {
        return res.status(404).json({
          success: false,
          message: "Chatbot configuration not found. Please verify the URL.",
        });
      }

      chatbotData = {
        chatbotId: chatbotDoc.chatbotId,
        systemPrompt: chatbotDoc.systemPrompt,
        businessName: chatbotDoc.businessName,
      };

      // Store in LRU cache
      chatbotCache.set(cleanId, chatbotData);
    }

    // Call OpenAI through isolated service
    const responseText = await generateChatResponse({
      systemPrompt: chatbotData.systemPrompt,
      conversationHistory: conversationHistory || [],
      userMessage: message,
    });

    return res.status(200).json({
      success: true,
      response: responseText,
      chatbotId: chatbotData.chatbotId,
    });
  } catch (error) {
    next(error);
  }
}
