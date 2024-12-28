import { Body, Controller, Post, Request, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from 'src/decorators/public.decorator';

type TokenResponse = {
  accessToken: string;
};

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Public()
  @Post('signup')
  async signup(@Body() data: SignupDto) {
    return this.service.createUser(data);
  }

  @Public()
  @Post('login')
  async login(@Body() data: LoginDto, @Response() res): Promise<TokenResponse> {
    const { email, password } = data;

    const user = await this.service.getUser(email, password);
    const accessToken = await this.service.createToken(user);
    const refreshToken = await this.service.createToken(user, 'refresh');

    res.cookie('refreshToken', refreshToken, {
      path: '/auth/token/refresh',
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ accessToken });
  }
}
