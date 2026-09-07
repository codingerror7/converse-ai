import mongoose from "mongoose";

/**
 * Returns safe database connection status without exposing credentials
 */
export const getDBStatus = () => {
  const state = mongoose.connection.readyState;
  const states = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting",
  };
  return {
    status: states[state] || "unknown",
    isConnected: state === 1,
  };
};

let connectionPromise = null;

/**
 * Connect to MongoDB with automatic retry and event listeners
 */
export const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (connectionPromise && mongoose.connection.readyState === 2) {
    return connectionPromise;
  }

  const mongoUri = process.env.MONGODB_URI || process.env.MONGOOSE_URL;

  if (!mongoUri) {
    console.error("FATAL: MONGODB_URI or MONGOOSE_URL is not defined in environment variables.");
    throw new Error("Missing MongoDB connection string in environment variables.");
  }

  connectionPromise = (async () => {
    try {
      const conn = await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 15000,
        maxPoolSize: 10,
        minPoolSize: 2,
        maxIdleTimeMS: 60000,
        socketTimeoutMS: 45000,
      });

      console.log(`MongoDB connected successfully: ${conn.connection.host}`);
      return conn;
    } catch (error) {
      console.warn("MongoDB initial connection attempt warning:", error.message);
      // Auto-retry connection in background
      setTimeout(() => {
        if (mongoose.connection.readyState !== 1) {
          console.log("Retrying MongoDB connection...");
          connectDB().catch(() => {});
        }
      }, 5000);
      throw error;
    }
  })();

  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err.message);
  });

  mongoose.connection.on("disconnected", () => {
    console.warn("MongoDB disconnected. Auto-reconnection active.");
  });

  return connectionPromise;
};
