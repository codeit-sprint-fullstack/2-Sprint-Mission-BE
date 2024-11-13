import { ProductRepository } from "../repositories/productRepository";

export class ProductService {
  constructor(private repository: ProductRepository) {}

  getById(id: number) {
    return this.repository.getById(id);
  }
}
