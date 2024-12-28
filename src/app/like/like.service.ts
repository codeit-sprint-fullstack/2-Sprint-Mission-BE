import { Injectable } from '@nestjs/common';
import { LikeRepository } from './like.repository';
import { Like } from '@prisma/client';

export type LikeResponse = {
  totalCount: number;
  list: Like[];
};

@Injectable()
export class LikeService {
  constructor(private readonly repository: LikeRepository) {}

  async getByUser(userId: string): Promise<LikeResponse> {
    const where = { userId };
    const list = await this.repository.get(where);
    const totalCount = await this.repository.count(where);

    return { totalCount, list };
  }

  async getByProduct(productId: string): Promise<LikeResponse> {
    const where = { productId };
    const list = await this.repository.get(where);
    const totalCount = await this.repository.count(where);

    return { totalCount, list };
  }

  async getByArticle(articleId: string): Promise<LikeResponse> {
    const where = { articleId };
    const list = await this.repository.get(where);
    const totalCount = await this.repository.count(where);

    return { totalCount, list };
  }

  async create(userId: string, data: Partial<Like>): Promise<Like> {
    const newData = { userId, ...data };
    return await this.repository.create(newData);
  }

  async deleteByProduct(userId: string, productId: string): Promise<null> {
    const where = {
      userId_productId: { userId, productId }, // 복합 unique key
    };
    await this.repository.delete(where);
    return;
  }

  async deleteByArticle(userId: string, articleId: string): Promise<null> {
    const where = {
      userId_articleId: { userId, articleId },
    };
    await this.repository.delete(where);
    return;
  }
}
