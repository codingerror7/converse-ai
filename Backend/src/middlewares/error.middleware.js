/**
 * 404 Not Found Middleware for API routes
 */
export function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    message: `API endpoint ${req.method} ${req.originalUrl} not found.`,
  });
}

/**
 * Global Centralized Error Handling Middleware
 */
export function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || err.status || 500;
  const isProd = process.env.NODE_ENV === "production";

  console.error(`[Error] [${req.method} ${req.url}]:`, err.message);

  // Mongoose validation errors
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((val) => val.message);
    return res.status(400).json({
      success: false,
      message: messages[0] || "Invalid data submitted.",
    });
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "Resource already exists.",
    });
  }

  // CastError (e.g. invalid MongoDB ObjectId)
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: "Malformed identifier format.",
    });
  }

  // Generic sanitized response
  const userMessage =
    statusCode >= 500 && isProd
      ? "An unexpected internal server error occurred. Please try again later."
      : err.message || "An error occurred.";

  res.status(statusCode).json({
    success: false,
    message: userMessage,
  });
}
