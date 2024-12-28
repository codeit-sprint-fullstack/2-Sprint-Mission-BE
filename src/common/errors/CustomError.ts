import { HttpStatus } from '@nestjs/common';

export class CustomError extends Error {
  public statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class UnauthorizedError extends CustomError {
  constructor(message: string) {
    super(HttpStatus.UNAUTHORIZED, message);
  } //401
}

export class ForbiddenError extends CustomError {
  constructor(message: string) {
    super(HttpStatus.FORBIDDEN, message);
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string) {
    super(HttpStatus.NOT_FOUND, message);
  } //404
}

export class ConflictError extends CustomError {
  constructor(message: string) {
    super(HttpStatus.CONFLICT, message);
  } //409
}
