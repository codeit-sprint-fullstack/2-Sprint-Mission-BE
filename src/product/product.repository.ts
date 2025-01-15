import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { IProductRepository } from './product.repository.interface';
import {
  CreateProductDTO,
  ProductOptions,
  ProductOrderByField,
  ProductsOrderBy,
} from '@/types/product.types';
import { Product } from '@prisma/client';
import { contains } from 'class-validator';
import { SortDirection } from '@/common/enums/order.enum';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(options: ProductOptions): Promise<Product[]> {
    const { page, pageSize, orderBy, keyword } = options;

    const whereCondition = keyword
      ? { title: { contains: keyword }, isDeletedAt: null }
      : { isDeletedAt: null };
    const orderByField: ProductOrderByField =
      orderBy === ProductsOrderBy.Recent
        ? { createdAt: SortDirection.Desc }
        : { favoriteCount: SortDirection.Desc };

    const products = await this.prisma.product.findMany({
      where: whereCondition,
      take: pageSize,
      skip: pageSize * page,
      orderBy: orderByField,
      include: {
        productImages: { where: { isDeletedAt: null } },
        owner: { select: { id: true, name: true } },
      },
    });
    return products;
  }

  async totalCount(options: ProductOptions): Promise<number> {
    const { keyword } = options;
    const whereCondition = keyword
      ? { title: { contains: keyword, isDeletedAt: null } }
      : { isDeletedAt: null };
    const totalCount = await this.prisma.product.count({
      where: keyword ? { title: { contains: keyword } } : {},
    });
    return totalCount;
  }

  async findById(id: string): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: { id, isDeletedAt: null },
      include: {
        owner: { select: { id: true, name: true } },
        productImages: { where: { isDeletedAt: null } },
        productFavorites: { where: { isDeletedAt: null } },
      },
    });
    return product;
  }

  async create(productData: CreateProductDTO) {
    const { title, description, price, s3keys, tags, ownerId } = productData;
    const product = await this.prisma.product.create({
      data: {
        title,
        description,
        productImages: {
          create: s3keys.map((s3key) => ({
            ownerId,
            s3key,
          })),
        },
        price,
        tags,
        owner: { connect: { id: ownerId } },
      },
      include: {
        owner: { select: { id: true, name: true } },
        productImages: true,
      },
    });
    return product;
  }

  async delete(id: string): Promise<Product> {
    const product = await this.prisma.product.update({
      where: { id },
      data: {
        isDeletedAt: new Date(),
        productImages: {
          updateMany: {
            where: { productId: id },
            data: { isDeletedAt: new Date() },
          },
        },
      },
      include: { owner: { select: { id: true, name: true } } },
    });
    return product;
  }
}
