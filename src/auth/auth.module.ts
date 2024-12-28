import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRepository } from '@/user/user.repository';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { JwtModule } from '@/jwt/jwt.module';
import { ConfigModule } from '@nestjs/config';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [PrismaModule, JwtModule, ConfigModule],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, AuthGuard],
  exports: [],
})
export class AuthModule {}
