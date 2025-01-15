import { Injectable } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';
import { DBClient } from 'src/database/prisma/prisma.service';

@Injectable()
export class ProductRepository {
  constructor(private readonly db: DBClient) {}

  async get(
    skip?: number,
    take?: number,
    where?: Prisma.ProductWhereInput,
    sortOrder?: Prisma.ProductOrderByWithRelationInput,
  ): Promise<Product[]> {
    return await this.db.product.findMany({
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
    return await this.db.product.findUnique({
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
    return await this.db.product.count({ where });
  }

  async create(data: Prisma.ProductCreateInput): Promise<Product> {
    return await this.db.product.create({
      data,
    });
  }

  async update(
    where: Prisma.ProductWhereUniqueInput,
    data: Prisma.ProductUpdateInput,
  ): Promise<Product> {
    return await this.db.product.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.ProductWhereUniqueInput): Promise<null> {
    await this.db.product.delete({
      where,
    });

    return;
  }
}
