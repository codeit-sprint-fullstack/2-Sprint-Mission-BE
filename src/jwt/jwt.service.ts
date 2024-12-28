import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  private readonly secret: string;
  private readonly refreshSecret: string;
  private readonly accessExpireTime: string;
  private readonly refreshExpireTime: string;

  constructor(private readonly configService: ConfigService) {
    this.secret = this.configService.get<string>('JWT_SECRET');
    this.refreshSecret = this.configService.get<string>('JWT_REFRESH_SECRET');
    this.accessExpireTime = this.configService.get<string>(
      'ACCESS_TOKEN_EXPIRE_Time',
    );
    this.refreshExpireTime = this.configService.get<string>(
      'REFRESH_TOKEN_EXPIRE_TIME',
    );
  }

  generateAccessToken(userId: string) {
    const payload = { id: userId };
    const accessToken = jwt.sign(payload, this.secret, {
      expiresIn: this.accessExpireTime,
    });
    return accessToken;
  }

  generateRefreshToken(userId: string) {
    const payload = { id: userId };
    const refreshToken = jwt.sign(payload, this.secret, {
      expiresIn: this.refreshExpireTime,
    });
    return refreshToken;
  }

  validateAccessToken(token: string) {
    try {
      return jwt.verify(token, this.secret);
    } catch (error) {
      return null; // 유효하지 않은 토큰일 경우 null 반환
    }
  }

  validateRefreshToken(token: string) {
    try {
      return jwt.verify(token, this.refreshSecret);
    } catch (error) {
      return null; // 유효하지 않은 리프레시 토큰일 경우 null 반환
    }
  }
}
