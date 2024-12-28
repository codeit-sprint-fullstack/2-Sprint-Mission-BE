import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AccessTokenGuard extends AuthGuard('access-token') {}

@Injectable()
export class RefreshTokenGuard extends AuthGuard('refresh-token') {}


