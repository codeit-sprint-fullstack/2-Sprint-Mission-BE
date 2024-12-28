import {
  CreateProductDTO,
  ProductDTO,
  ProductOptions,
} from '@/types/product.types';

export interface IProductService {
  getProducts(
    options: ProductOptions,
  ): Promise<{ totalCount: number; list: ProductDTO[] }>;
  getProductById(id: string): Promise<ProductDTO>;
  createProduct(productData: CreateProductDTO): Promise<ProductDTO>;
  deleteProduct(id: string, userId: string): Promise<ProductDTO>;
}
