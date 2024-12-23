import { PartialType } from '@nestjs/mapped-types';

export class CreateProduct {
  name: string;
  description: string;
  price: number;
  tags?: string[];
  images?: string[];
}

export class PatchProduct extends PartialType(CreateProduct) {}
