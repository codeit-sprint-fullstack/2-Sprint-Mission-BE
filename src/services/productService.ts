import { ProductRepository } from "../repositories/productRepository";

export class ProductService {
  constructor(private repository: ProductRepository) {}

  getProductById = async (id: number) => {
    return await this.repository.getProductById(id);
  };

  createProduct = async (req: any) => {
    return await this.repository.createProduct(req);
  };

  updateProduct = async (req: any, id: number) => {
    return await this.repository.updateProduct(req, id);
  };

  deleteProduct = async (id: number) => {
    return await this.repository.deleteProduct(id);
  };
}
