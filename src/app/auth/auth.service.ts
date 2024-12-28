import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { User } from '@prisma/client';
import { ComparePassword, HashingPassword } from 'src/utils/HashPassword';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly repository: AuthRepository,
    private readonly jwt: JwtService,
  ) {}

  async createUser(user: Partial<User>): Promise<User | void> {
    const existingUser = await this.repository.findByEmail(user.email);
    if (existingUser) {
      throw new BadRequestException('이미 존재하는 이메일입니다');
    }

    const existingNickname = await this.repository.findByNickname(
      user.nickname,
    );
    if (existingNickname) {
      throw new BadRequestException('이미 존재하는 닉네임입니다');
    }

    const hashedPassword = await HashingPassword(user.password);
    await this.repository.create({
      ...user,
      password: hashedPassword,
    });

    return;
  }

  async getUser(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.repository.findByEmail(email);

    if (!user) {
      throw new BadRequestException('존재하지 않는 이메일입니다');
    }

    const verifiedPassword = await ComparePassword(password, user.password);

    if (!verifiedPassword) {
      throw new BadRequestException('비밀번호가 일치하지 않습니다');
    }

    return this.filterData(user);
  }

  filterData(user: User) {
    const { password, ...data } = user;
    return data;
  }

  async createToken(user: Omit<User, 'password'>, type?: 'refresh') {
    const payload = { userId: user.id };
    const options = { expiresIn: type === 'refresh' ? '1w' : '4h' };

    return this.jwt.sign(payload, options);
  }

  async refreshToken(userId: string, refreshToken: string) {
    const user = await this.repository.findById(userId);

    // if (!user || user.refreshToken !== refreshToken) {
    //   throw new BadRequestException('사용자 인증에 문제가 있습니다');
    // }

    const accessToken = await this.createToken(user);
    const newRefreshToken = await this.createToken(user, 'refresh');

    return { accessToken, newRefreshToken };
  }
}
