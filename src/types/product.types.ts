import { ProductImage } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export enum ProductsOrderBy {
  recent = 'recent',
  favorite = 'favorite',
}

export class ProductOptionsDTO {
  @Type(() => Number)
  @IsInt()
  page: number = 0;

  @Type(() => Number)
  @IsInt()
  pageSize: number = 10;

  @IsEnum(ProductsOrderBy)
  orderBy: ProductsOrderBy = ProductsOrderBy.recent;

  @IsOptional()
  keyword?: string;
}

export class ProductOptions {
  page: number;
  pageSize: number;
  orderBy: ProductsOrderBy;
  keyword?: string;
}

export class CreateProductWithoutFilesDTO {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @Type(() => Number)
  @IsInt()
  price: number;

  @Transform(({ value }) => {
    const arrayValue: string[] = value;
    return arrayValue;
  })
  @IsArray()
  @ArrayMinSize(1)
  tags: string[];
}

export class FilesDTO {
  @IsArray()
  @ArrayMinSize(1)
  files: Express.Multer.File[];
}

export class CreateProductDTO {
  title: string;
  description: string;
  price: number;
  tags: string[];
  files?: Express.Multer.File[];
  s3keys?: string[];
  productImages?: ProductImage[];
  images?: { id: string; imageUrl: string }[];
  ownerId?: string;
}

export class ProductDTO {
  title: string;
  description: string;
  price: number;
  tags: string[];
  isDeletedAt?: Date;
  productImages?: ProductImage[];
  images?: { id: string; imageUrl: string }[];
  owner?: { id: string; name: string };
  ownerId?: string;
}
