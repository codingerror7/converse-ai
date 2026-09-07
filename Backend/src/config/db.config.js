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

/**
 * Connect to MongoDB with connection reuse and event handlers
 */
export const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  const mongoUri = process.env.MONGODB_URI || process.env.MONGOOSE_URL;

  if (!mongoUri) {
    console.error("FATAL: MONGODB_URI or MONGOOSE_URL is not defined in environment variables.");
    throw new Error("Missing MongoDB connection string in environment variables.");
  }

  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 8000,
      maxPoolSize: 10,
    });

    console.log(`MongoDB connected successfully: ${conn.connection.host}`);

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err.message);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("MongoDB disconnected. Reconnection will be attempted automatically.");
    });

    return conn;
  } catch (error) {
    console.error("MongoDB initial connection failed:", error.message);
    throw error;
  }
};
