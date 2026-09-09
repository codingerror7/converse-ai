const PRODUCTION_API_URL = "https://converse-ai-j0nw.onrender.com/api";
const PRODUCTION_FRONTEND_URL = "https://converse-8sqenwhpd-codingerror7s-projects.vercel.app";

/**
 * Resolves the canonical API base URL with automatic normalization:
 * - Strips trailing slashes
 * - Ensures the `/api` prefix is always present without duplicating
 * - Gracefully falls back to production Render backend or local backend
 *
 * @returns {string} Fully qualified API base URL ending with `/api`
 */
export function getApiBaseUrl() {
  const rawUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!rawUrl || typeof rawUrl !== "string" || !rawUrl.trim()) {
    // If not explicitly set in environment, use production Render backend in production,
    // or fallback to local port 8000 in dev
    if (process.env.NODE_ENV === "production") {
      return PRODUCTION_API_URL;
    }
    return "http://localhost:8000/api";
  }

  let cleaned = rawUrl.trim().replace(/\/+$/, "");
  if (!cleaned.endsWith("/api")) {
    cleaned = `${cleaned}/api`;
  }
  return cleaned;
}

/**
 * Resolves the canonical Frontend base URL:
 * - Uses active window origin in browser if available
 * - Falls back to NEXT_PUBLIC_FRONTEND_URL or production Vercel URL
 *
 * @returns {string} Fully qualified Frontend base URL without trailing slash
 */
export function getFrontendBaseUrl() {
  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin.replace(/\/+$/, "");
  }

  const rawUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;
  if (rawUrl && typeof rawUrl === "string" && rawUrl.trim()) {
    return rawUrl.trim().replace(/\/+$/, "");
  }

  if (process.env.NODE_ENV === "production") {
    return PRODUCTION_FRONTEND_URL;
  }
  return "http://localhost:3000";
}

/**
 * Generates the absolute public URL for a created chatbot.
 *
 * @param {string} chatbotId - The unique identifier of the chatbot
 * @returns {string} The complete public chatbot URL
 */
export function getChatbotShareUrl(chatbotId) {
  const sanitizedId = (chatbotId || "").trim();
  return `${getFrontendBaseUrl()}/chat/${encodeURIComponent(sanitizedId)}`;
}

const REQUEST_TIMEOUT_MS = 18000;

/**
 * Enhanced fetch with timeout and unified error parsing
 */
async function fetchWithTimeout(url, options = {}) {
  const timeoutController = new AbortController();
  const timeoutId = setTimeout(() => timeoutController.abort(), REQUEST_TIMEOUT_MS);

  // Combine external abort signal with internal timeout signal
  const externalSignal = options.signal;
  let combinedSignal = timeoutController.signal;

  if (externalSignal) {
    if (externalSignal.aborted) {
      clearTimeout(timeoutId);
      throw new DOMException("Request was cancelled", "AbortError");
    }
    // Listen to external abort
    externalSignal.addEventListener("abort", () => timeoutController.abort(), { once: true });
  }

  try {
    const response = await fetch(url, {
      ...options,
      signal: combinedSignal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === "AbortError") {
      if (externalSignal && externalSignal.aborted) {
        throw new Error("Request was cancelled.");
      }
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
 * @param {AbortSignal} [data.signal]
 * @returns {Promise<{success: boolean, chatbot: Object}>}
 */
export async function createChatbotAPI(data, signal = null) {
  const { signal: explicitSignal, ...payload } = data;
  const activeSignal = signal || explicitSignal;

  const response = await fetchWithTimeout(`${getApiBaseUrl()}/chatbots`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    signal: activeSignal,
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
 * @param {AbortSignal} [signal]
 * @returns {Promise<{success: boolean, chatbot: Object}>}
 */
export async function getChatbotAPI(chatbotId, signal = null) {
  const sanitizedId = encodeURIComponent((chatbotId || "").trim());
  const response = await fetchWithTimeout(`${getApiBaseUrl()}/chatbots/${sanitizedId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
    signal,
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
 * @param {AbortSignal} [data.signal]
 * @returns {Promise<{success: boolean, response: string}>}
 */
export async function sendChatMessageAPI({
  chatbotId,
  message,
  conversationHistory = [],
  signal = null,
}) {
  const response = await fetchWithTimeout(`${getApiBaseUrl()}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chatbotId: (chatbotId || "").trim(),
      message: (message || "").trim(),
      conversationHistory: conversationHistory
        .slice(-14)
        .map((m) => ({ role: m.role, content: m.content })),
    }),
    signal,
  });

  const result = await parseResponseData(response);

  if (!response.ok || !result.success) {
    throw new Error(
      result.message || "Unable to receive AI response. Please try asking again."
    );
  }

  return result;
}

/**
 * Checks backend health and database connectivity.
 *
 * @param {AbortSignal} [signal]
 * @returns {Promise<{status: string, database: string, service: string}>}
 */
export async function checkApiHealthAPI(signal = null) {
  const response = await fetchWithTimeout(`${getApiBaseUrl()}/health`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
    signal,
  });

  return await parseResponseData(response);
}
