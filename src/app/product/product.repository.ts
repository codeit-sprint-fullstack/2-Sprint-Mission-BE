import { Injectable } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async get(
    skip?: number,
    take?: number,
    where?: Prisma.ProductWhereInput,
    sortOrder?: Prisma.ProductOrderByWithRelationInput,
  ): Promise<Product[]> {
    return await this.prisma.product.findMany({
      skip,
      take,
      where,
      orderBy: sortOrder,
      include: {
        owner: {
          select: {
            nickname: true,
            image: true,
          },
        },
      },
    });
  }

  async getById(id: string): Promise<Product> {
    return await this.prisma.product.findUnique({
      where: { id },
      include: {
        owner: {
          select: {
            nickname: true,
            image: true,
          },
        },
      },
    });
  }

  async count(where: Prisma.ProductWhereInput): Promise<number> {
    return await this.prisma.product.count({ where });
  }

  async create(data: Prisma.ProductCreateInput): Promise<Product> {
    return await this.prisma.product.create({
      data,
    });
  }

  async update(
    where: Prisma.ProductWhereUniqueInput,
    data: Prisma.ProductUpdateInput,
  ): Promise<Product> {
    return await this.prisma.product.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.ProductWhereUniqueInput): Promise<null> {
    await this.prisma.product.delete({
      where,
    });

    return;
  }
}
