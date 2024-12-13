import { Prisma, PrismaClient } from '@prisma/client';
import { CursorCondition } from '#types/conditions.type.js';
import { CommentDTO } from '#types/dtos.type.js';
import { CommentFindOptions, CommentType } from '#types/options.type.js';
import MESSAGES from '#utils/constants/messages.js';
import { BadRequest } from '#utils/http-errors.js';

export class CommentRepository {
  private readonly comment;
  constructor(private readonly prismaClient: PrismaClient) {
    this.comment = prismaClient.comment;
  }

  findMany = async () => {
    const comments = await this.comment.findMany({ orderBy: { createdAt: Prisma.SortOrder.desc } });

    return comments;
  };

  findManyAndCursor = async ({ id, limit, cursor, type }: CommentFindOptions) => {
    let typeOption;
    switch (type) {
      case CommentType.Article:
        typeOption = { articleId: id };
        break;
      case CommentType.Product:
        typeOption = { productId: id };
        break;
      default:
        throw new BadRequest(MESSAGES.BAD_REQUEST);
    }
    const pageOption: CursorCondition = cursor ? { skip: 1, cursor: { id: cursor } } : {};

    const comments = await this.comment.findMany({
      where: typeOption,
      orderBy: { createdAt: Prisma.SortOrder.desc },
      take: limit,
      include: {
        owner: {
          select: {
            nickname: true,
          },
        },
      },
      ...pageOption,
    });
    const nextCursor = comments.length ? { nextCursor: comments.at(-1)?.id } : {};

    return { ...nextCursor, list: comments };
  };

  findById = async (id: string) => {
    const comment = await this.comment.findUnique({ where: { id } });

    return comment;
  };

  create = async (data: CommentDTO) => {
    const comment = await this.comment.create({ data });

    return comment;
  };

  update = async (id: string, data: { content: string }) => {
    const comment = await this.comment.update({ where: { id }, data });

    return comment;
  };

  deleteById = async (id: string) => {
    const comment = await this.comment.delete({ where: { id } });

    return comment;
  };
}
