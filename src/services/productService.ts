import { ProductRepository } from "../repositories/productRepository";

export class ProductService {
  constructor(private repository: ProductRepository) {}

  getById = async (id: number) => {
    return await this.repository.getById(id);
  };
}
