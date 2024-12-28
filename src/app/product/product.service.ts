import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { Prisma, Product } from '@prisma/client';
import { ProductSort } from 'src/utils/sortOption';
import { UploadService } from 'src/database/s3/upload.service';

export type ProductResponse = {
  totalCount: number;
  list: Product[];
};

@Injectable()
export class ProductService {
  constructor(
    private readonly repository: ProductRepository,
    private readonly s3: UploadService,
  ) {}

  async get(queries: Query.List): Promise<ProductResponse> {
    const { skip, take, orderBy, keyword } = queries;
    const where = keyword
      ? {
          OR: [
            { name: { contains: keyword } },
            { description: { contains: keyword } },
          ],
        }
      : undefined;

    const sortOrder = ProductSort(orderBy);

    const list = await this.repository.get(skip, take, where, sortOrder);
    const totalCount = await this.repository.count(where);

    return { totalCount, list };
  }

  async getById(id: string): Promise<Product> {
    const product = await this.repository.getById(id);

    if (!product) {
      throw new NotFoundException('상품이 존재하지 않습니다');
    }

    return product;
  }

  async create(
    userId: string,
    file: Express.Multer.File,
    data: Prisma.ProductCreateInput,
  ): Promise<Product> {
    const imgUrl = await this.s3.upload(file);
    const newData = { ownerId: userId, images: [imgUrl], ...data };
    return await this.repository.create(newData);
  }

  async update(productId: string, data: Partial<Product>): Promise<Product> {
    const where = {
      id: productId,
    };
    return await this.repository.update(where, data);
  }

  async delete(where: Prisma.ProductWhereUniqueInput): Promise<Product> {
    return await this.repository.delete(where);
  }
}
