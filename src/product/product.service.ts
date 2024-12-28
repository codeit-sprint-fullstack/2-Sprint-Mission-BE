import { Injectable } from '@nestjs/common';
import { IProductService } from './product.service.interface';
import { ProductRepository } from './product.repository';
import {
  CreateProductDTO,
  ProductDTO,
  ProductOptions,
} from '@/types/product.types';
import ErrorMessage from '@/common/enums/error.message.enums';
import { ForbiddenError, NotFoundError } from '@/common/errors/CustomError';
import { S3Service } from '@/s3/s3.service';
import { ConfigService } from '@nestjs/config';
import addS3KeysToProductData from '@/utils/addS3KeysToProductData';
import filterProductInfo from '@/utils/filterProductInfo';

@Injectable()
export class ProductService implements IProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly s3Service: S3Service,
  ) {}

  async getProducts(
    options: ProductOptions,
  ): Promise<{ totalCount: number; list: ProductDTO[] }> {
    const [totalCount, list] = await Promise.all([
      this.productRepository.totalCount(options),
      this.productRepository.findMany(options),
    ]);
    const responseListPromise = list.map((product) =>
      filterProductInfo(this.s3Service, product),
    );
    const responseList = await Promise.all(responseListPromise);
    return { totalCount, list: responseList };
  }

  async getProductById(id: string): Promise<ProductDTO> {
    const product = await this.productRepository.findById(id);
    if (!product) throw new NotFoundError(ErrorMessage.PRODUCT_NOT_FOUND);
    const responseProduct = await filterProductInfo(this.s3Service, product);
    return product;
  }

  async createProduct(productData: CreateProductDTO): Promise<ProductDTO> {
    const repositoryProductData = await addS3KeysToProductData(
      this.s3Service,
      productData,
    );

    const product = await this.productRepository.create(repositoryProductData);
    const filteredProduct = await filterProductInfo(this.s3Service, product);
    return filteredProduct;
  }

  async deleteProduct(id: string, userId: string): Promise<ProductDTO> {
    const product = await this.productRepository.findById(id);
    if (!product) throw new NotFoundError(ErrorMessage.PRODUCT_NOT_FOUND);

    if (product.ownerId !== userId) {
      throw new ForbiddenError(ErrorMessage.PRODUCT_FORBIDDEN);
    }

    const deletedProduct = await this.productRepository.delete(id);
    return product;
  }
}
