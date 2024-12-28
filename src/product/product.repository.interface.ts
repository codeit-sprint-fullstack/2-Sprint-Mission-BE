import {
  CreateProductDTO,
  ProductDTO,
  ProductOptions,
} from '@/types/product.types';

export interface IProductRepository {
  findMany(options: ProductOptions): Promise<ProductDTO[]>;
  totalCount(option: ProductOptions): Promise<number>;
  findById(id: string): Promise<ProductDTO | null>;
  create(productData: CreateProductDTO): Promise<ProductDTO>;
  delete(id: string): Promise<ProductDTO>;
}
