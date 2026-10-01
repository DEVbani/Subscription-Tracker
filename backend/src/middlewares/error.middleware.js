export function notFound(req, res, next) {
  const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
}

export function errorHandler(error, req, res, next) {
  console.error(error);

  const status = error.statusCode || 500;

  res.status(status).json({
    success: false,
    message: status === 500 ? "Internal server error" : error.message,
  });
}