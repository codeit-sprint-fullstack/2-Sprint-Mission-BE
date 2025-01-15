import { Injectable } from '@nestjs/common';
import { Like, Prisma } from '@prisma/client';
import { DBClient } from 'src/database/prisma/prisma.service';

@Injectable()
export class LikeRepository {
  constructor(private readonly db: DBClient) {}

  async get(where: Prisma.LikeWhereInput): Promise<Like[]> {
    return await this.db.like.findMany({ where });
  }

  async count(where: Prisma.LikeWhereInput): Promise<number> {
    return await this.db.like.count({ where });
  }

  async create(data: Prisma.LikeCreateInput): Promise<Like> {
    return await this.db.like.create({ data });
  }

  async delete(where: Prisma.LikeWhereUniqueInput): Promise<Like> {
    return this.db.like.delete({ where });
  }
}
