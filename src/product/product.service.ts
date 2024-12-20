import { ProductRepository } from './product.repository';
import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { ProductNotFoundException } from 'src/common/exceptions/http-exception';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async getProductById(id: string) {
    const product = await this.productRepository.findProductById(id);
    if (!product) {
      throw new ProductNotFoundException();
    }
    return product;
  }

  createProduct = async (req: any): Promise<Product> => {
    return await this.productRepository.createProduct(req);
  };

  updateProduct = async (id: string, req: any): Promise<Product> => {
    return await this.productRepository.updateProduct(req, id);
  };

  deleteProduct = async (id: string): Promise<Product> => {
    return await this.productRepository.deleteProduct(id);
  };
}
