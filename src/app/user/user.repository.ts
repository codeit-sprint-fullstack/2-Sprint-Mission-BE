import { Injectable } from '@nestjs/common';
import { Like, Prisma, Product, User } from '@prisma/client';
import { DBClient } from 'src/database/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private db: DBClient) {}

  async findById(id: string): Promise<User> {
    return this.db.user.findUnique({
      where: {
        id,
      },
    });
  }

  async update(
    where: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateInput,
  ): Promise<User> {
    return this.db.user.update({
      where,
      data,
    });
  }

  async updatePassword(
    where: Prisma.UserWhereUniqueInput,
    newPassword: string,
  ): Promise<User> {
    return this.db.user.update({
      where,
      data: {
        password: newPassword,
      },
    });
  }

  async getUserProducts(
    skip?: number,
    take?: number,
    where?: Prisma.ProductWhereInput,
    orderBy?: Prisma.ProductOrderByWithRelationInput,
  ): Promise<Product[]> {
    return await this.db.product.findMany({
      skip,
      take,
      where,
      orderBy,
    });
  }

  async getUserLikes(
    skip?: number,
    take?: number,
    where?: Prisma.LikeWhereInput,
    sortOrder?: Prisma.LikeOrderByWithRelationInput,
  ): Promise<Like[]> {
    return await this.db.like.findMany({
      skip,
      take,
      where,
      orderBy: sortOrder,
    });
  }
}
