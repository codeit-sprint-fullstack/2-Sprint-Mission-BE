import { ProductRepository } from "../repositories/productRepository";

export class ProductService {
  private productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  getById(id: number) {
    return this.productRepository.getById(id);
  }
}
