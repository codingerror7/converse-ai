import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import compression from "compression";
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

// High-performance gzip/deflate response compression
app.use(
  compression({
    threshold: 1024, // only compress responses >= 1KB
    filter: (req, res) => {
      if (req.headers["x-no-compression"]) {
        return false;
      }
      return compression.filter(req, res);
    },
  })
);

// CORS configuration supporting local development, custom domains, and Vercel preview deployments
function buildAllowedOrigins() {
  const defaults = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:5173",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3001",
  ];

  const envOrigins = [
    process.env.FRONTEND_URL,
    process.env.CLIENT_ORIGIN,
  ]
    .filter(Boolean)
    .flatMap((val) => val.split(",").map((s) => s.trim()))
    .map((origin) => origin.replace(/\/+$/, "")); // Strip trailing slashes

  return Array.from(new Set([...defaults, ...envOrigins]));
}

const allowedOrigins = buildAllowedOrigins();

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser requests (Postman, curl, server-to-server)
      if (!origin) return callback(null, true);

      const cleanOrigin = origin.replace(/\/+$/, "");

      // Direct match against allowed origins list
      if (allowedOrigins.includes(cleanOrigin) || allowedOrigins.includes("*")) {
        return callback(null, true);
      }

      // Match Vercel preview deployments (*.vercel.app)
      if (/^https:\/\/[a-zA-Z0-9-_.]+\.vercel\.app$/.test(cleanOrigin)) {
        return callback(null, true);
      }

      // Permissive fallback in local development
      if (process.env.NODE_ENV !== "production") {
        return callback(null, true);
      }

      console.warn(`[CORS Blocked] Origin "${origin}" is not authorized.`);
      return callback(new Error("Origin not allowed by CORS policy."));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept", "Origin"],
    credentials: true,
    optionsSuccessStatus: 200,
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
  res.status(db.isConnected ? 200 : 200).json({
    status: db.isConnected ? "healthy" : "connecting",
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
  server = app.listen(PORT, () => {
    console.log(`🚀 Converse-AI Backend running on http://localhost:${PORT}`);
  });

  try {
    await connectDB();
  } catch (error) {
    console.warn("Server running with background database reconnection pending...");
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