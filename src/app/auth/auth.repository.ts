import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findByNickname(nickname: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: {
        nickname,
      },
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async create(user: Partial<User>): Promise<User> {
    return this.prisma.user.create({
      data: {
        email: user.email,
        nickname: user.nickname,
        password: user.password,
        image: user.image ?? '',
      },
    });
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }
}
