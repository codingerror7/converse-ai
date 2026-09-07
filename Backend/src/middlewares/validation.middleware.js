import { z } from "zod";

// Chatbot creation validation schema
export const createChatbotSchema = z.object({
  businessName: z
    .string({ required_error: "Business name is required." })
    .trim()
    .min(2, "Business name must be at least 2 characters.")
    .max(120, "Business name cannot exceed 120 characters."),
  category: z
    .string({ required_error: "Business category is required." })
    .trim()
    .min(2, "Category must be selected.")
    .max(80, "Category cannot exceed 80 characters."),
  description: z
    .string({ required_error: "Business description is required." })
    .trim()
    .min(10, "Please provide at least 10 characters of context.")
    .max(2000, "Description cannot exceed 2000 characters."),
  behavior: z
    .string()
    .trim()
    .max(500, "Behavior cannot exceed 500 characters.")
    .optional(),
  instructions: z
    .string()
    .trim()
    .max(1000, "Instructions cannot exceed 1000 characters.")
    .optional(),
});

// Chat message validation schema
export const chatMessageSchema = z.object({
  chatbotId: z
    .string({ required_error: "Chatbot ID is required." })
    .trim()
    .min(3, "Invalid chatbot ID format."),
  message: z
    .string({ required_error: "Message cannot be empty." })
    .trim()
    .min(1, "Message cannot be empty.")
    .max(1500, "Message cannot exceed 1500 characters."),
  conversationHistory: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().max(2500),
      })
    )
    .max(30, "Conversation history cannot exceed 30 items.")
    .optional()
    .default([]),
});

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
