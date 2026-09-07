import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import { connectDB, getDBStatus } from "./src/config/db.config.js";
import apiRouter from "./src/routes/index.js";
import { notFoundHandler, errorHandler } from "./src/middlewares/error.middleware.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Enable reverse proxy trust (for Vercel, Railway, Render, Nginx, Cloudflare)
app.set("trust proxy", 1);

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
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes("*")) {
        return callback(null, true);
      }
      return callback(null, true); // Permissive in dev to avoid CORS blockers
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
  const db = getDBStatus();
  res.status(200).json({
    name: "Converse-AI API",
    version: "1.0.0",
    status: "online",
    database: db.status,
    documentation: "/api/health",
  });
});

// Root level /health route alias
app.get("/health", (req, res) => {
  const db = getDBStatus();
  res.status(db.isConnected ? 200 : 503).json({
    status: db.isConnected ? "healthy" : "degraded",
    database: db.status,
    service: "converse-ai-backend",
    timestamp: new Date().toISOString(),
  });
});

// Mount main API router
app.use("/api", apiRouter);

// 404 Fallback
app.use(notFoundHandler);

// Global Central Error Handler
app.use(errorHandler);

let server = null;

// Start Server and Connect Database
async function startServer() {
  try {
    await connectDB();
    server = app.listen(PORT, () => {
      console.log(`🚀 Converse-AI Backend running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server due to database connection error:", error.message);
    process.exit(1);
  }
}

// Graceful Shutdown Handlers
async function gracefulShutdown(signal) {
  console.log(`\nReceived ${signal}. Shutting down gracefully...`);
  if (server) {
    server.close(() => {
      console.log("HTTP server closed.");
    });
  }
  try {
    await mongoose.connection.close(false);
    console.log("MongoDB connection closed.");
  } catch (err) {
    console.error("Error closing MongoDB connection:", err.message);
  }
  process.exit(0);
}

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

startServer();