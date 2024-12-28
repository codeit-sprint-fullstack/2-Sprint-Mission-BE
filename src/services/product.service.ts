import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../repositories/product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async get({ page, pageSize, orderBy, keyword }) {
    const skip = page * pageSize;
    const take = pageSize;
    const sort = orderBy === 'favorite' ? {favoriteCnt: 'desc'} : {createdAt: 'desc'};

    const filter = {
      OR: [
        { name: { contains: keyword, mode: 'insensitive' }},
        { description: { contains: keyword, mode: 'insensitive' }},
      ],
    };

    const products = await this.productRepository.get({skip, take, sort, filter});
    const totalCount = await this.productRepository.count(filter);

    return { data: products, totalCount };
  }

  async getById(id: string) {
    return this.productRepository.getById(id);
  }

  async create(data) {
    return this.productRepository.save(data);
  }

  async update(id: string, data) {
    return this.productRepository.update(id, data);
  }

  async remove(id: string) {
    return this.productRepository.remove(id);
  }
}
