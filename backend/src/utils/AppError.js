// AppError.js — A custom error class so we can attach status codes and error codes to any error we throw

class AppError extends Error {
  constructor(message, statusCode, code) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
  }
}

module.exports = AppError;