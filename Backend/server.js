import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import { connectDB } from "./src/config/db.config.js";
import apiRouter from "./src/routes/index.js";
import { notFoundHandler, errorHandler } from "./src/middlewares/error.middleware.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Security Middlewares
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

// CORS configuration supporting local development and deployed frontend
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes("*")) {
        return callback(null, true);
      }
      return callback(null, true); // Permissive in dev to avoid friction
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Request body parsers with size limit protection
app.use(express.json({ limit: "128kb" }));
app.use(express.urlencoded({ extended: true, limit: "128kb" }));

// Root info route
app.get("/", (req, res) => {
  res.status(200).json({
    name: "Converse-AI API",
    version: "1.0.0",
    status: "online",
    documentation: "/api/health",
  });
});

// Mount main API router
app.use("/api", apiRouter);

// 404 Fallback
app.use(notFoundHandler);

// Global Central Error Handler
app.use(errorHandler);

// Start Server and Connect Database
async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Converse-AI Backend running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server due to database connection error:", error.message);
    process.exit(1);
  }
}

startServer();