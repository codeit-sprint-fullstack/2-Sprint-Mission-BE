import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module.js';
import { NestFactory } from '@nestjs/core';
import { GlobalExceptionFilter } from './common/exceptions/global-exception-filter.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }));
  app.useGlobalFilters(new GlobalExceptionFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
