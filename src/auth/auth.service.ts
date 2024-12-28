import ErrorMessage from '@/common/enums/error.message.enums';
import { UnauthorizedError } from '@/common/errors/CustomError';
import { JwtService } from '@/jwt/jwt.service';
import { AuthDTO } from '@/types/auth.types';
import { UserRepository } from '@/user/user.repository';
import filterUserInfo from '@/utils/filterUserInfo';
import passwordHashing from '@/utils/passwordHashing';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(userData: AuthDTO) {
    const user = await this.userRepository.findUserByEmail(userData.email);

    if (!user) throw new UnauthorizedError(ErrorMessage.USER_UNAUTHORIZED_ID);
    const isSuccess = await bcrypt.compare(userData.password, user.password);
    if (!isSuccess)
      throw new UnauthorizedError(ErrorMessage.USER_UNAUTHORIZED_PW);

    const accessToken = this.jwtService.generateAccessToken(user.id);
    const refreshToken = this.jwtService.generateRefreshToken(user.id);
    const responseUserData = filterUserInfo(user, accessToken, refreshToken);
    return responseUserData;
  }
}
