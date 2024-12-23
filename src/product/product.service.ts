import { ProductRepository } from './product.repository.js';
import { Injectable } from '@nestjs/common';
import { ProductNotFoundException } from '../common/exceptions/http-exception.js';
import type { Product } from '@prisma/client';
import type { CreateProduct, PatchProduct } from './product.type.js';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async getProductById(id: string) {
    const product = await this.productRepository.findProductById(id);
    if (!product) throw new ProductNotFoundException();
    return product;
  }

  createProduct = async (data: CreateProduct): Promise<Product> => {
    return await this.productRepository.createProduct(data);
  };

  updateProduct = async (id: string, data: PatchProduct): Promise<Product> => {
    const product = await this.productRepository.findProductById(id);
    if (!product) throw new ProductNotFoundException();
    return await this.productRepository.updateProduct(data, id);
  };

  deleteProduct = async (id: string): Promise<Product> => {
    const product = await this.productRepository.findProductById(id);
    if (!product) throw new ProductNotFoundException();
    return await this.productRepository.deleteProduct(id);
  };
}
