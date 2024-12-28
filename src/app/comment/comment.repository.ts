import { Injectable } from '@nestjs/common';
import { Comment, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class CommentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async get(
    where: Prisma.CommentWhereInput,
    skip?: number,
    take?: number,
  ): Promise<Comment[]> {
    return await this.prisma.comment.findMany({
      skip,
      take,
      orderBy: { createdAt: 'desc' },
      where,
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

  async getById(where: Prisma.CommentWhereUniqueInput): Promise<Comment> {
    return await this.prisma.comment.findUnique({ where });
  }

  async create(data: Prisma.CommentCreateInput): Promise<Comment> {
    return await this.prisma.comment.create({ data });
  }

  async update(
    where: Prisma.CommentWhereUniqueInput,
    data: Prisma.CommentUpdateInput,
  ): Promise<Comment> {
    return await this.prisma.comment.update({ where, data });
  }

  async delete(where: Prisma.CommentWhereUniqueInput): Promise<null> {
    await this.prisma.comment.delete({ where });

    return;
  }
}
