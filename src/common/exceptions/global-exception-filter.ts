import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import ExceptionMessages from './exception-message.js';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = ExceptionMessages.INTERNAL_SERVER_ERROR.toString();

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const responseMessage = exception.getResponse();
      message = typeof responseMessage === 'string' ? responseMessage : ExceptionMessages.BAD_REQUEST.toString();
    }

    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
