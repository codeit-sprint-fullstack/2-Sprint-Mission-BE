import { Prisma, PrismaClient } from '@prisma/client';
import { OrderByCondition, WhereCondition } from '#types/conditions.type.js';
import { ArticleDTO } from '#types/dtos.type.js';
import { FindOptions } from '#types/options.type.js';

export class ArticleRepository {
  private readonly article;
  constructor(private readonly prismaClient: PrismaClient) {
    this.article = prismaClient.article;
  }

  count = async (keyword: string) => {
    const searchOption: WhereCondition = keyword
      ? {
          where: {
            OR: [{ title: { contains: keyword } }, { content: { contains: keyword } }],
          },
        }
      : {};

    const count = await this.article.count(searchOption);

    return count;
  };

  findMany = async ({ orderBy, page, pageSize, keyword }: FindOptions) => {
    let sortOption: OrderByCondition;
    switch (orderBy) {
      case 'like':
        sortOption = { orderBy: { likeCount: Prisma.SortOrder.desc } };
        break;
      case 'recent':
      default:
        sortOption = { orderBy: { createdAt: Prisma.SortOrder.desc } };
    }

    const searchOption: WhereCondition = keyword ? { where: { title: { contains: keyword } } } : {};

    const articles = await this.article.findMany({
      ...searchOption,
      ...sortOption,
      take: pageSize,
      skip: (page - 1) * pageSize,
      include: {
        owner: {
          select: {
            nickname: true,
          },
        },
      },
    });

    return articles;
  };

  findById = async (id: string) => {
    const article = await this.article.findUnique({
      where: { id },
      include: {
        owner: {
          select: {
            nickname: true,
          },
        },
      },
    });

    return article;
  };

  create = async (data: ArticleDTO) => {
    const article = await this.article.create({ data });

    return article;
  };

  update = async (id: string, data: ArticleDTO) => {
    const article = await this.article.update({ where: { id }, data });

    return article;
  };

  deleteById = async (id: string) => {
    const article = await this.article.delete({ where: { id } });

    return article;
  };

  like = async (articleId: string, userId: string) => {
    const article = await this.article.update({
      where: { id: articleId },
      data: {
        likeUsers: { connect: { id: userId } },
        likeCount: { increment: 1 },
      },
    });

    return article;
  };

  unlike = async (articleId: string, userId: string) => {
    const article = await this.article.update({
      where: { id: articleId },
      data: {
        likeUsers: { disconnect: { id: userId } },
        likeCount: { decrement: 1 },
      },
    });

    return article;
  };
}
