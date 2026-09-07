/**
 * Centralized Hardened API Client for Converse-AI Frontend
 */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

const REQUEST_TIMEOUT_MS = 18000;

/**
 * Enhanced fetch with timeout and unified error parsing
 */
async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    if (error.name === "AbortError") {
      throw new Error("Request timed out. The server took too long to respond.");
    }
    throw new Error(
      "Unable to connect to Converse-AI server. Please check your internet connection or verify the backend is active."
    );
  }
}

/**
 * Safely parses response JSON or falls back to text/status message
 */
async function parseResponseData(response) {
  try {
    return await response.json();
  } catch {
    return {
      success: response.ok,
      message: response.statusText || "Unexpected response from server.",
    };
  }
}

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
  const response = await fetchWithTimeout(`${API_BASE_URL}/chatbots`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await parseResponseData(response);

  if (!response.ok || !result.success) {
    throw new Error(
      result.message || "Failed to create chatbot. Please verify inputs and try again."
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
  const sanitizedId = encodeURIComponent((chatbotId || "").trim());
  const response = await fetchWithTimeout(`${API_BASE_URL}/chatbots/${sanitizedId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const result = await parseResponseData(response);

  if (!response.ok || !result.success) {
    throw new Error(
      result.message || "Chatbot not found or link has expired."
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
  const response = await fetchWithTimeout(`${API_BASE_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chatbotId: (chatbotId || "").trim(),
      message: (message || "").trim(),
      conversationHistory: conversationHistory.slice(-16),
    }),
  });

  const result = await parseResponseData(response);

  if (!response.ok || !result.success) {
    throw new Error(
      result.message || "Unable to receive AI response. Please try asking again."
    );
  }

  return result;
}
