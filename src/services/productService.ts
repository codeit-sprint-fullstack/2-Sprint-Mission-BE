import productRepository from "../repositories/productRepository";

export class ProductService {
  getById(id: number) {
    return productRepository.getById(id);
  }
}
