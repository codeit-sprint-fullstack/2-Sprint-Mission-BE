import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class CommentRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async get({ cur, take, skip }) {
    return this.prisma.comment.findMany({ cur, take, skip });
  }

  async getProduct({ productId, cur, take, skip }) {
    return this.prisma.comment.findMany({ where: { productId }, cur, take, skip });
  }

  async getArticle({ articleId, cur, take, skip }) {
    return this.prisma.comment.findMany({ where: { articleId }, cur, take, skip });
  }

  async getById(id: string) {
    return this.prisma.comment.findUnique({ where: { id } });
  }

  async save(data) {
    return this.prisma.comment.create({ data });
  }

  async update(id: string, data) {
    return this.prisma.comment.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.comment.delete({ where: { id } });
  }
}