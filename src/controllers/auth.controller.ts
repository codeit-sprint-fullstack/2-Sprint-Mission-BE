import { assert } from 'superstruct';
import { AuthService } from '#services/auth.service.js';
import { UserDTO } from '#types/dtos.type.js';
import { RequestHandler } from '#types/request.type.js';
import HTTP_CODES from '#utils/constants/http-codes.js';
import MESSAGES from '#utils/constants/messages.js';
import { CreateUser, SignIn } from '#utils/struct.js';

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  signUp: RequestHandler<{ body: UserDTO }> = async (req, res, next) => {
    assert(req.body, CreateUser);

    const user = await this.authService.createUser(req.body);

    // NOTE 유저가 이미 존재함
    if (user === true) res.status(HTTP_CODES.BAD_REQUEST).json({ messages: MESSAGES.IS_EXIST });

    res.status(HTTP_CODES.CREATED).json(user);
  };

  signIn: RequestHandler<{ body: UserDTO }> = async (req, res) => {
    assert(req.body, SignIn);

    const { user, refreshToken } = (await this.authService.signIn(req.body))!;

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    res.json(user);
  };

  getMe: RequestHandler = async (req, res) => {
    const { userId } = req.user!;

    const user = await this.authService.getUserById(userId);

    res.json(user);
  };

  refreshToken: RequestHandler = async (req, res) => {
    const user = await this.authService.getNewToken();

    res.json(user);
  };
}
