import { z } from "zod";

// Helper to sanitize text from control characters while keeping valid multiline text
const sanitizeText = (val) =>
  typeof val === "string" ? val.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "").trim() : val;

// Chatbot creation validation schema
export const createChatbotSchema = z
  .object({
    businessName: z
      .string({ required_error: "Business name is required." })
      .transform(sanitizeText)
      .refine((val) => val.length >= 2, "Business name must be at least 2 characters.")
      .refine((val) => val.length <= 120, "Business name cannot exceed 120 characters."),
    category: z
      .string({ required_error: "Business category is required." })
      .transform(sanitizeText)
      .refine((val) => val.length >= 2, "Category must be selected.")
      .refine((val) => val.length <= 80, "Category cannot exceed 80 characters."),
    description: z
      .string({ required_error: "Business description is required." })
      .transform(sanitizeText)
      .refine((val) => val.length >= 10, "Please provide at least 10 characters of context.")
      .refine((val) => val.length <= 2000, "Description cannot exceed 2000 characters."),
    behavior: z
      .string()
      .transform(sanitizeText)
      .refine((val) => !val || val.length <= 500, "Behavior cannot exceed 500 characters.")
      .optional(),
    instructions: z
      .string()
      .transform(sanitizeText)
      .refine((val) => !val || val.length <= 1000, "Instructions cannot exceed 1000 characters.")
      .optional(),
  })
  .strip();

// Chat message validation schema
export const chatMessageSchema = z
  .object({
    chatbotId: z
      .string({ required_error: "Chatbot ID is required." })
      .transform(sanitizeText)
      .refine((val) => /^c_[a-zA-Z0-9_-]{4,32}$/.test(val), "Invalid chatbot ID format."),
    message: z
      .string({ required_error: "Message cannot be empty." })
      .transform(sanitizeText)
      .refine((val) => val.length >= 1, "Message cannot be empty.")
      .refine((val) => val.length <= 1500, "Message cannot exceed 1500 characters."),
    conversationHistory: z
      .array(
        z
          .object({
            role: z.enum(["user", "assistant"]),
            content: z.string().transform(sanitizeText).refine((val) => val.length <= 2500, "Message in history too long."),
          })
          .strip()
      )
      .max(30, "Conversation history cannot exceed 30 items.")
      .optional()
      .default([]),
  })
  .strip();

/**
 * Middleware factory for validating request bodies against a Zod schema.
 *
 * @param {z.ZodSchema} schema
 */
export function validateBody(schema) {
  return (req, res, next) => {
    try {
      const validated = schema.parse(req.body);
      req.body = validated;
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstIssue = error.issues[0];
        return res.status(400).json({
          success: false,
          message: firstIssue ? firstIssue.message : "Validation failed.",
          errors: error.issues.map((i) => ({
            field: i.path.join("."),
            message: i.message,
          })),
        });
      }
      next(error);
    }
  };
}
