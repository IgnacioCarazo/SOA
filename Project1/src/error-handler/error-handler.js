class ExternalAPIError extends Error {
    constructor(message, statusCode = 502) {
      super(message);
      this.name = 'ExternalAPIError';
      this.statusCode = statusCode;
    }
  }
  
  class ValidationError extends Error {
    constructor(message, statusCode = 400) {
      super(message);
      this.name = 'ValidationError';
      this.statusCode = statusCode;
    }
  }
  
  module.exports = { ExternalAPIError, ValidationError };