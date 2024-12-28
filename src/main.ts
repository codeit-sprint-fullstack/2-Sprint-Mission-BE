import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import GlobalExceptionFilter from './common/filters/GlobalExceptionFilter';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './auth/auth.guard';
import { JwtService } from './jwt/jwt.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const authGuard = app.get(AuthGuard);
  app
    .useGlobalGuards(authGuard)
    .useGlobalPipes(new ValidationPipe({ transform: true }))
    .useGlobalFilters(new GlobalExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application listening on port ${process.env.PORT}`);
}
bootstrap();
