import { ProductRepository } from "../repositories/productRepository";
import { Product } from "../types/productType";

export class ProductService {
  constructor(private repository: ProductRepository) {}

  getProductById = async (id: number): Promise<any> => {
    return await this.repository.getProductById(id);
  };

  createProduct = async (req: any): Promise<Product> => {
    return await this.repository.createProduct(req);
  };

  updateProduct = async (req: any, id: number): Promise<Product> => {
    return await this.repository.updateProduct(req, id);
  };

  deleteProduct = async (id: number): Promise<any> => {
    return await this.repository.deleteProduct(id);
  };
}
