import mongoose from "mongoose";

const chatbotSchema = new mongoose.Schema(
  {
    chatbotId: {
      type: String,
      required: [true, "Chatbot ID is required"],
      unique: true,
      index: true,
      trim: true,
    },
    businessName: {
      type: String,
      required: [true, "Business name is required"],
      trim: true,
      maxlength: [120, "Business name cannot exceed 120 characters"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      maxlength: [80, "Category cannot exceed 80 characters"],
    },
    description: {
      type: String,
      required: [true, "Business description is required"],
      trim: true,
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    behavior: {
      type: String,
      default: "Helpful, professional, warm, and concise",
      trim: true,
      maxlength: [500, "Behavior cannot exceed 500 characters"],
    },
    instructions: {
      type: String,
      default: "",
      trim: true,
      maxlength: [1000, "Instructions cannot exceed 1000 characters"],
    },
    systemPrompt: {
      type: String,
      required: [true, "System prompt is required"],
    },
    welcomeMessage: {
      type: String,
      required: [true, "Welcome message is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Method to return public-safe chatbot info (excluding systemPrompt and internal details)
chatbotSchema.methods.toPublicJSON = function () {
  return {
    chatbotId: this.chatbotId,
    businessName: this.businessName,
    category: this.category,
    welcomeMessage: this.welcomeMessage,
    createdAt: this.createdAt,
  };
};

export const Chatbot = mongoose.models.Chatbot || mongoose.model("Chatbot", chatbotSchema);
