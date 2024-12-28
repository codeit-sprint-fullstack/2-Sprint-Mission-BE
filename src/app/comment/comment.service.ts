import { Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { Comment, Prisma } from '@prisma/client';

@Injectable()
export class CommentService {
  constructor(private readonly repository: CommentRepository) {}

  async getByProduct(
    productId: string,
    skip?: number,
    take?: number,
  ): Promise<Comment[]> {
    const where = {
      productId,
    };

    return await this.repository.get(where, skip, take);
  }

  async getByArticle(
    articleId: string,
    skip?: number,
    take?: number,
  ): Promise<Comment[]> {
    const where = {
      articleId,
    };

    return await this.repository.get(where, skip, take);
  }

  async getById(id: string): Promise<Comment> {
    const where = { id };
    return await this.repository.getById(where);
  }

  async create(
    userId: string,
    data: Prisma.CommentCreateInput,
  ): Promise<Comment> {
    const newData = { writerId: userId, ...data };
    return await this.repository.create(newData);
  }

  async update(
    userId: string,
    id: string,
    data: Prisma.CommentUpdateInput,
  ): Promise<Comment> {
    const where = { id };

    return await this.repository.update(where, data);
  }

  async delete(userId: string, where: Prisma.CommentWhereUniqueInput) {
    return await this.repository.delete(where);
  }
}
