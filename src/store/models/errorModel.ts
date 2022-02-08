export default class HttpError extends Error {
    constructor(message, statusCode) {
      super(message);
      statusCode = statusCode || 500;
    }
  }