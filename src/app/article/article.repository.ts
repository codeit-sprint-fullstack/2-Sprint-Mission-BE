import { Injectable } from '@nestjs/common';
import { Article, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class ArticleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async get(
    skip?: number,
    take?: number,
    where?: Prisma.ArticleWhereInput,
    sortOrder?: Prisma.ArticleOrderByWithRelationInput,
  ): Promise<Article[]> {
    return await this.prisma.article.findMany({
      skip,
      take,
      where,
      orderBy: sortOrder,
      include: {
        writer: {
          select: {
            nickname: true,
            image: true,
          },
        },
      },
    });
  }

  async getById(id: string): Promise<Article> {
    return await this.prisma.article.findUnique({
      where: { id },
      include: {
        writer: {
          select: {
            nickname: true,
            image: true,
          },
        },
      },
    });
  }

  async count(where: Prisma.ArticleWhereInput): Promise<number> {
    return await this.prisma.article.count({ where });
  }

  async create(data: Prisma.ArticleCreateInput): Promise<Article> {
    return await this.prisma.article.create({
      data,
    });
  }

  async update(
    where: Prisma.ArticleWhereUniqueInput,
    data: Prisma.ArticleUpdateInput,
  ): Promise<Article> {
    return await this.prisma.article.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.ArticleWhereUniqueInput): Promise<null> {
    this.prisma.article.delete({
      where,
    });

    return;
  }
}
