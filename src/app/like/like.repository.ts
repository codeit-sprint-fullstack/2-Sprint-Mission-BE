import { Injectable } from '@nestjs/common';
import { Like, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class LikeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async get(where: Prisma.LikeWhereInput): Promise<Like[]> {
    return await this.prisma.like.findMany({ where });
  }

  async count(where: Prisma.LikeWhereInput): Promise<number> {
    return await this.prisma.like.count({ where });
  }

  async create(data: Prisma.LikeCreateInput): Promise<Like> {
    return await this.prisma.like.create({ data });
  }

  async delete(where: Prisma.LikeWhereUniqueInput): Promise<Like> {
    return this.prisma.like.delete({ where });
  }
}
