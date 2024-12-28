import { Injectable } from '@nestjs/common';
import { AuthRepository } from '../repositories/auth.repository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const TOKEN_EXPIRATION = {
  ACCESS: '1h',
  REFRESH: '7d',
}

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  async filterSensitiveUserData(user) {
    const { password, refreshToken, ...filteredUser } = user;
    return filteredUser;
  }

  async verifyPassword(password: string, hashedPassword: string) {
    const isValidate = await bcrypt.compare(password, hashedPassword);
    if (!isValidate) {
      throw new Error('Invalid password');
    }
  }

  async createUser(user) {
    const existedUser = await this.authRepository.findByEmail(user.email);

    if (existedUser) {
      throw new Error('Email existed');
    }

    const hashedPassword = await this.hashPassword(user.password);
    const createdUser = await this.authRepository.save({ ...user, password: hashedPassword });
    return this.filterSensitiveUserData(createdUser);
  }

  async login(email: string, password: string) {
    const user = await this.authRepository.findByEmail(email);
    const accessToken = this.createToken(user, 'access');
    const refreshToken = this.createToken(user, 'refresh');

    await this.authRepository.update(user.id, { refreshToken });
    return { accessToken, refreshToken, user };
  }

  async getUser(email: string, password: string) {
    const user = await this.authRepository.findByEmail(email);
    
    if (!user) {
      throw new Error('Invalid email');
    }

    await this.verifyPassword(password, user.password);
    return this.filterSensitiveUserData(user);
  }

  async getUserById(id: string) {
    if (!id) {
      throw new Error('Invalid user');
    }

    const user = await this.authRepository.findById(id);

    if (!user) {
      throw new Error('Invalid user');
    }

    return this.filterSensitiveUserData(user);
  }

  async updateUser(id: string, data) {
    return await this.authRepository.update(id, data);
  }

  async createToken(user, type) {
    const payload = {
      userId: user.id
    };

    const options = {
      expiresIn: TOKEN_EXPIRATION[type.toUpperCase()]
    };

    return jwt.sign(payload, process.env.JWT_SECRET, options);
  }

  async refreshToken(userId: string, refreshToken: string) {
    const user = await this.authRepository.findById(userId);

    if (!user) {
      throw new Error('Invalid user');
    }

    if (user.refreshToken !== refreshToken) {
      throw new Error('Invalid refresh token');
    }

    const accessToken = this.createToken(user, 'access');
    const newRefreshToken = this.createToken(user, 'refresh');

    return { accessToken, newRefreshToken };
  }

  async clearRefreshToken(userId: string) {
    return await this.authRepository.update(userId, { refreshToken: null });
  }

  async oauthCreateOrUpdate(provider: string, providerId: string, email: string, nickname: string) {
    const user = await this.authRepository.createOrUpdate(provider, providerId, email, nickname);
    return this.filterSensitiveUserData(user);
  }
}