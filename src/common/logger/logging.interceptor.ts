import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { logger } from './winston-logger.js';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const { ip, url, method, headers, body } = request;
    const requestBody = JSON.stringify(body);
    const logMessage = `
      IP: ${ip}
      Method: ${method}
      URL: ${url}
      Headers: ${JSON.stringify(headers)}
      Body: ${requestBody}
    `;

    logger.info(`Request: ${logMessage}`);

    return next.handle().pipe(
      tap((data) => {
        const { statusCode } = response;
        const responseBody = JSON.stringify(data);
        const logMessage = `
            Response Status: ${statusCode}
            Response Body: ${responseBody}
            Cookies: ${JSON.stringify(response.get('Set-Cookie'))}
          `;

        logger.info(`Response: ${logMessage}`);
      }),
    );
  }
}
