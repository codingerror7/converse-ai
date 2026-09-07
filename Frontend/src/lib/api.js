/**
 * Centralized API Client for Converse-AI Frontend
 */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

/**
 * Creates a new custom chatbot with business parameters.
 *
 * @param {Object} data
 * @param {string} data.businessName
 * @param {string} data.category
 * @param {string} data.description
 * @param {string} [data.behavior]
 * @param {string} [data.instructions]
 * @returns {Promise<{success: boolean, chatbot: Object}>}
 */
export async function createChatbotAPI(data) {
  const response = await fetch(`${API_BASE_URL}/chatbots`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.message || "Failed to create chatbot. Please try again."
    );
  }

  return result;
}

/**
 * Retrieves public profile details for a chatbot by its ID.
 *
 * @param {string} chatbotId
 * @returns {Promise<{success: boolean, chatbot: Object}>}
 */
export async function getChatbotAPI(chatbotId) {
  const response = await fetch(`${API_BASE_URL}/chatbots/${chatbotId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.message || "Chatbot not found or unable to load details."
    );
  }

  return result;
}

/**
 * Sends a message to the chatbot and receives the AI response.
 *
 * @param {Object} data
 * @param {string} data.chatbotId
 * @param {string} data.message
 * @param {Array<{role: string, content: string}>} [data.conversationHistory=[]]
 * @returns {Promise<{success: boolean, response: string}>}
 */
export async function sendChatMessageAPI({
  chatbotId,
  message,
  conversationHistory = [],
}) {
  const response = await fetch(`${API_BASE_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chatbotId,
      message,
      conversationHistory,
    }),
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.message || "Unable to receive AI response. Please try again."
    );
  }

  return result;
}
