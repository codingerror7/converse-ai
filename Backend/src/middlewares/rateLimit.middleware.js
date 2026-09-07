import rateLimit from "express-rate-limit";

// Rate limit for creating chatbots (prevent spam creation)
export const createChatbotLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 25, // limit each IP to 25 chatbot creations per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many chatbots created from this IP. Please wait a few minutes before trying again.",
  },
});

// Rate limit for chat interactions (protect OpenAI credits from abuse)
export const chatLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 60, // limit each IP to 60 chat messages per 5 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "You have sent too many messages. Please slow down and try again in a moment.",
  },
});

// General API rate limiter for other endpoints
export const generalLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Rate limit exceeded. Please try again shortly.",
  },
});
