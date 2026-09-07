import { Chatbot } from "../models/Chatbot.model.js";
import { generateChatResponse } from "../services/openai.service.js";

/**
 * POST /api/chat
 * Process a user message and return the AI assistant's contextual response
 */
export async function sendChatMessage(req, res, next) {
  try {
    const { chatbotId, message, conversationHistory } = req.body;

    // Retrieve chatbot and its system prompt from MongoDB (minimal lean projection)
    const chatbot = await Chatbot.findOne({ chatbotId: chatbotId.trim() })
      .select("chatbotId systemPrompt businessName")
      .lean();

    if (!chatbot) {
      return res.status(404).json({
        success: false,
        message: "Chatbot configuration not found. Please verify the URL.",
      });
    }

    // Call OpenAI through isolated service
    const responseText = await generateChatResponse({
      systemPrompt: chatbot.systemPrompt,
      conversationHistory: conversationHistory || [],
      userMessage: message,
    });

    return res.status(200).json({
      success: true,
      response: responseText,
      chatbotId: chatbot.chatbotId,
    });
  } catch (error) {
    next(error);
  }
}
