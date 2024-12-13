import { expressjwt } from 'express-jwt';
import { jwtSecret } from '#configs/jwt.config.js';
import { getStorage } from '#middlewares/asyncLocalStorage.js';
import { UserService } from '#services/user.service.js';
import { RequestHandler } from '#types/request.type.js';
import assertExist from '#utils/assertExist.js';

export class TokenVerifier {
  constructor(private userService: UserService) {}

  optionalVerifyAccessToken: RequestHandler = async (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader) {
      await this.verifyAccessToken(req, res, next);
      return;
    }
    next();
  };

  verifyAccessToken: RequestHandler = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    return await new Promise<void>(resolve => {
      expressjwt({
        secret: jwtSecret,
        algorithms: ['HS256'],
        requestProperty: 'user',
      })(req, res, async err => {
        if (err) {
          next(err);
          return;
        }

        const user = await this.userService.getUserById(req.user!.userId);
        assertExist(user);

        const storage = getStorage();
        storage.userId = req.user!.userId;
        storage.accessToken = token;
        storage.tokenEXP = req.user!.exp;

        next();
        resolve();
      });
    });
  };

  verifyRefreshToken: RequestHandler = async (req, res, next) => {
    const token = req.cookies.refreshToken;

    return await new Promise<void>(resolve => {
      expressjwt({
        secret: jwtSecret,
        algorithms: ['HS256'],
        getToken: req => req.cookies.refreshToken,
        requestProperty: 'user',
      })(req, res, async err => {
        if (err) {
          next(err);
          return;
        }

        const user = await this.userService.getUserById(req.user!.userId);
        assertExist(user);

        const storage = getStorage();
        storage.userId = req.user!.userId;
        storage.refreshToken = token;
        storage.tokenEXP = req.user!.exp;

        next();
        resolve();
      });
    });
  };
}
