import { HttpException, HttpStatus } from '@nestjs/common';
import ExceptionMessages from './exception-message';

type ExceptionConstructor = new () => HttpException;

export function customHttpException(message: string, status: HttpStatus): ExceptionConstructor {
  return class extends HttpException {
    constructor() {
      super(message, status);
    }
  };
}

export const BadRequestException: ExceptionConstructor = customHttpException(ExceptionMessages.BAD_REQUEST, HttpStatus.BAD_REQUEST);
export const ProductNotFoundException: ExceptionConstructor = customHttpException(ExceptionMessages.PRODUCT_NOT_FOUND, HttpStatus.NOT_FOUND);
