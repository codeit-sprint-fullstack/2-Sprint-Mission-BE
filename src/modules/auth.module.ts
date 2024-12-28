import { Module } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AccessTokenStrategy, RefreshTokenStrategy } from '../middlewares/passport/jwtStrategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule], // .env 파일 사용을 위해 ConfigModule 추가
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
  exports: [AuthService],
})
export class AuthModule {}
