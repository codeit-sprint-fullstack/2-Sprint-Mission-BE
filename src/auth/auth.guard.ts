import ErrorMessage from '@/common/enums/error.message.enums';
import { UnauthorizedError } from '@/common/errors/CustomError';
import { JwtService } from '@/jwt/jwt.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    const requiredPaths = [
      { path: '/products', method: 'POST' },
      { path: '/products/', method: 'DELETE' },
    ];
    const isRequired = requiredPaths.some((route) => {
      return (
        request.method === route.method &&
        (route.path === '/products'
          ? request.path === route.path
          : request.path.startsWith(route.path))
      );
    });

    if (!isRequired) return true;
    if (!token)
      throw new UnauthorizedError(ErrorMessage.TOKEN_UNAUTHORIZED_NOTFOUND);
    const user = this.jwtService.validateAccessToken(token);
    if (!user)
      throw new UnauthorizedError(ErrorMessage.TOKEN_UNAUTHORIZED_VALIDATION);

    request.user = user;
    return true;
  }
}
