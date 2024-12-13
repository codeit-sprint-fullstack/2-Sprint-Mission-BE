export class HttpError extends Error {
  status: number;
  name: string = 'HttpError';

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    // NOTE 프로토타입 체인을 설정하지 않으면 instanceof 등의 연산에서 문제가 발생할 수 있음
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}

export class BadRequest extends HttpError {
  constructor(message: string) {
    super(message, 400);
    this.name = 'BadRequest';
    Object.setPrototypeOf(this, BadRequest.prototype);
  }
}

export class Unauthorized extends HttpError {
  constructor(message: string) {
    super(message, 401);
    this.name = 'Unauthorized';
    Object.setPrototypeOf(this, Unauthorized.prototype);
  }
}

export class Forbidden extends HttpError {
  constructor(message: string) {
    super(message, 403);
    this.name = 'Forbidden';
    Object.setPrototypeOf(this, Forbidden.prototype);
  }
}

export class NotFound extends HttpError {
  constructor(message: string) {
    super(message, 404);
    this.name = 'NotFound';
    Object.setPrototypeOf(this, NotFound.prototype);
  }
}

export class InternalServerError extends HttpError {
  constructor(message: string) {
    super(message, 500);
    this.name = 'InternalServerError';
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }
}
