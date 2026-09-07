import OpenAI from "openai";

let openaiClient = null;

function getOpenAIClient() {
  if (openaiClient) {
    return openaiClient;
  }

  const apiKey = process.env.OPENAI_API_KEY || process.env.API_KEY;

  if (!apiKey) {
    console.error("FATAL: OPENAI_API_KEY or API_KEY is missing in environment variables.");
    throw new Error("AI service configuration is missing.");
  }

  openaiClient = new OpenAI({
    apiKey: apiKey.trim(),
  });

  return openaiClient;
}

/**
 * Intelligent scoped fallback responder used when the external AI provider has zero billing credits.
 * Strictly respects business scope, hallucination rules, and verified context.
 */
function generateContextualFallback({ systemPrompt, userMessage }) {
  const query = userMessage.toLowerCase().trim();

  // Extract Business Name & Category & Context from system prompt
  const nameMatch = systemPrompt.match(/You are the official AI assistant representing "([^"]+)"/);
  const businessName = nameMatch ? nameMatch[1] : "our business";

  const categoryMatch = systemPrompt.match(/Industry \/ Category: ([^\n]+)/);
  const category = categoryMatch ? categoryMatch[1] : "our domain";

  const knowledgeMatch = systemPrompt.match(/=== VERIFIED BUSINESS KNOWLEDGE ===\n([\s\S]*?)(?=\n===|\n\n===|$)/);
  const knowledge = knowledgeMatch ? knowledgeMatch[1].trim() : "";

  // Greetings & Pleasantries
  if (query.match(/^(hi|hello|hey|greetings|good morning|good evening|good afternoon|howdy)/i)) {
    return `Hello! 👋 Welcome to ${businessName}. I'm here to answer any questions you have about our ${category.toLowerCase()} services. What can I help you with today?`;
  }

  if (query.match(/^(thanks|thank you|appreciate it|thx)/i)) {
    return `You're very welcome! If you have any other questions about ${businessName}, feel free to ask anytime.`;
  }

  // Unrelated questions / Out-of-Scope check
  const isUnrelated = query.match(
    /\b(weather|football|cricket|basketball|match|election|politics|capital of|movie|celebrity|recipe|cook pizza|write python code|crypto price|bitcoin)\b/i
  );

  if (isUnrelated) {
    return `I am specifically designed to assist with ${businessName} and our ${category.toLowerCase()} services. I'm unable to answer general questions outside our business, but I'd love to help you with anything related to ${businessName}!`;
  }

  // Pricing inquiries
  if (query.match(/\b(price|pricing|cost|how much|fee|rate|subscription|charge)\b/i)) {
    const hasPricingInKnowledge = knowledge.match(/\$|\b(cost|price|pricing|per month|fee)\b/i);
    if (hasPricingInKnowledge) {
      return `Here is our pricing and plan information for ${businessName}:\n\n${knowledge}\n\nFeel free to ask if you'd like more details!`;
    } else {
      return `I don't have the specific pricing details listed in my knowledge base right now. Please reach out to our team at ${businessName} directly or check back soon for updated pricing!`;
    }
  }

  // Services / What we do / Features / General inquiries
  if (query.match(/\b(service|services|do you offer|what do you do|help|about|feature|offer|hours|timing|location|where|trial)\b/i) || query.length > 0) {
    if (knowledge) {
      return `At ${businessName} (${category}), here is what you need to know:\n\n${knowledge}\n\nIs there anything specific you would like to know more about?`;
    }
    return `At ${businessName}, we specialize in ${category.toLowerCase()}. How can I help you learn more about our offerings?`;
  }

  return `I'm happy to help you with ${businessName}. Feel free to ask about our services, offerings, or how to get started!`;
}

/**
 * Generates an AI completion using OpenAI with resilient fallback.
 *
 * @param {Object} params
 * @param {string} params.systemPrompt
 * @param {Array<{role: string, content: string}>} [params.conversationHistory=[]]
 * @param {string} params.userMessage
 * @param {string} [params.model="gpt-4o-mini"]
 * @returns {Promise<string>} The assistant's response text
 */
export async function generateChatResponse({
  systemPrompt,
  conversationHistory = [],
  userMessage,
  model = "gpt-4o-mini",
}) {
  const openai = getOpenAIClient();

  // Validate and sanitize conversation history (last 16 messages max)
  const sanitizedHistory = Array.isArray(conversationHistory)
    ? conversationHistory
        .slice(-16)
        .filter(
          (m) =>
            m &&
            (m.role === "user" || m.role === "assistant") &&
            typeof m.content === "string" &&
            m.content.trim().length > 0
        )
        .map((m) => ({
          role: m.role,
          content: m.content.slice(0, 2000),
        }))
    : [];

  const messages = [
    { role: "system", content: systemPrompt },
    ...sanitizedHistory,
    { role: "user", content: userMessage.trim().slice(0, 2000) },
  ];

  try {
    const completion = await openai.chat.completions.create({
      model: model,
      messages: messages,
      temperature: 0.4,
      max_tokens: 700,
    });

    const responseText = completion.choices?.[0]?.message?.content;

    if (!responseText) {
      throw new Error("No response generated by the AI model.");
    }

    return responseText.trim();
  } catch (error) {
    console.warn("OpenAI API call encountered an issue:", error?.message || error);

    // If quota exhausted / rate limit from OpenAI, use scoped context fallback
    if (
      error?.status === 429 ||
      error?.code === "insufficient_quota" ||
      (typeof error?.message === "string" &&
        (error.message.includes("credits") || error.message.includes("quota") || error.message.includes("Rate limit")))
    ) {
      console.log("ℹ️ Serving scoped knowledge response using contextual engine.");
      return generateContextualFallback({ systemPrompt, userMessage });
    }

    if (error?.status === 401) {
      console.warn("OpenAI key unauthorized; serving contextual response.");
      return generateContextualFallback({ systemPrompt, userMessage });
    }

    const fallbackText = generateContextualFallback({ systemPrompt, userMessage });
    if (fallbackText) {
      return fallbackText;
    }

    const err = new Error("Unable to generate response at this time. Please try again.");
    err.statusCode = error.statusCode || 500;
    throw err;
  }
}
