interface ProductImagesProperties {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  isDeletedAt: Date;
  s3key: string;
}

export interface IProductImages {}
export class ProductImages implements IProductImages {
  private id: string;
  private createdAt: Date;
  private updatedAt: Date;
  private isDeletedAt: Date;
  private s3key: string;

  constructor(private productImagesProperties: ProductImagesProperties) {
    this.id = productImagesProperties.id;
    this.createdAt = productImagesProperties.createdAt;
    this.updatedAt = productImagesProperties.updatedAt;
    this.isDeletedAt = productImagesProperties.isDeletedAt;
    this.s3key = productImagesProperties.s3key;
  }
}
