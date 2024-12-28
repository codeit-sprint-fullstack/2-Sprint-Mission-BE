import { Injectable } from '@nestjs/common';
import { Article, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ArticleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async get({ skip, take, sort, filter }): Promise<Article[]> {
    return this.prisma.article.findMany({
      skip,
      take,
      orderBy: sort,
      where: filter,
      include: {
        owner: {
          select: {
            nickname: true,
            image: true,
          }
        }
      }
    });
  }

  async count(filter: Prisma.ArticleWhereInput): Promise<number> {
    return this.prisma.article.count({
      where: filter,
    });
  }

  async getById(id: string): Promise<Article> {
    return this.prisma.article.findUnique({
      where: { id },
    });
  }

  async save(data: Prisma.ArticleCreateInput): Promise<Article> {
    return this.prisma.article.create({
      data,
    });
  }

  async update(id: string, data: Prisma.ArticleUpdateInput): Promise<Article> {
    return this.prisma.article.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<Article> {
    return this.prisma.article.delete({
      where: { id },
    });
  }
}
