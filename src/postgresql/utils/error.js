class TypeError extends Error {
  constructor(message) {
    super(message);
    this.name = 'TypeError';
    this.statusCode = 400;
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = 400;
  }
}

class CastError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CastError';
    this.statusCode = 404;
  }
}

export { TypeError, ValidationError, CastError };
