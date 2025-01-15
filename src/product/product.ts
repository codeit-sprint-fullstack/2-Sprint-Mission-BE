import { ProductImages } from './productImages';

export interface ProductProperties {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  isDeletedAt: Date;
  title: string;
  price: number;
  description: string;
  productFavorites: any[];
  productImages: ProductImages[];
}
export interface IProduct {}
export class Product implements IProduct {
  private id: string;
  private createdAt: Date;
  private updatedAt: Date;
  private isDeletedAt: Date;
  private title: string;
  private price: number;
  private description: string;
  private productFavorites: any[];
  private productImages: ProductImages[];

  constructor(productProperties: ProductProperties) {
    this.id = productProperties.id;
    this.createdAt = productProperties.createdAt;
    this.updatedAt = productProperties.updatedAt;
    this.isDeletedAt = productProperties.isDeletedAt;
    this.title = productProperties.title;
    this.price = productProperties.price;
    this.description = productProperties.description;
    this.productFavorites = productProperties.productFavorites;
    this.productImages = productProperties.productImages;
  }
}
