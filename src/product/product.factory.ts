import { IProduct, Product, ProductProperties } from './product';

export class ProductFactory implements IProduct {
  static create(productProperties: ProductProperties): IProduct {
    return new Product(productProperties);
  }
}
