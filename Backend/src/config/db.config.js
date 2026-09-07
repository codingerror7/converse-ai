import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
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
    });

    isConnected = conn.connections[0].readyState === 1;
    console.log(`MongoDB connected successfully: ${conn.connection.host}`);

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err.message);
      isConnected = false;
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("MongoDB disconnected. Reconnection will be attempted on next query.");
      isConnected = false;
    });

    return conn;
  } catch (error) {
    console.error("MongoDB initial connection failed:", error.message);
    throw error;
  }
};
