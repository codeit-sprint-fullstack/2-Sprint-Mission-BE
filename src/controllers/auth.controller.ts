import { AuthService } from '../services/auth.service';
import { Controller, Patch, Post, Req, Res } from '@nestjs/common';

@Controller('auth')
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Req() req, @Res() res) {
    const { email, password, nickname } = req.body;
    
    if (!email || !password || !nickname) {
      res.status(400).send();
      return;
    }

    const user = await this.authService.createUser(req.body);
   return res.status(201).json(user);
  }

  @Post('login')
  async login(@Req() req, @Res() res) {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).send();
      return;
    }

    const { accessToken, refreshToken, user } = await this.authService.login(email, password);

    return res.json({ accessToken, refreshToken, user });
  }

  @Post('logout')
  async logout(@Req() req, @Res() res) {
    const userId = req.user?.id;

    if (!userId) {
      throw new Error('Invalid user');
    }

    await this.authService.clearRefreshToken(userId);
  }

  @Patch('refresh')
  async refreh(@Req() req, @Res() res) {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      res.status(400).send();
      return;
    }
    const userId = req.user?.id;
    if(!userId) {
        res.status(400).send();
        return;
        }
    const { accessToken, newRefreshToken } = await this.authService.refreshToken(userId, refreshToken);

    await this.authService.updateUser(userId, { refreshToken: newRefreshToken });
    return res.json({ accessToken, refreshToken: newRefreshToken });
  }
}
