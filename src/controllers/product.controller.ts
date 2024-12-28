import { Controller, Get, Query, Param, Post, Body, Patch, Delete } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { CreateProductDto, PatchProductDto } from '../dto/product.dto';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProductList(
    @Query('page') page: number = 0,
    @Query('pageSize') pageSize: number = 10,
    @Query('orderBy') orderBy: string = 'recent',
    @Query('keyword') keyword: string = '',
  ) {
    return this.productService.get({ page, pageSize, orderBy, keyword });
  }

  @Get(':id')
  async getProduct(
    @Param('id') id: string,
  ) {
    return this.productService.getById(id);
  }

  @Post() 
  async createProduct(
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.productService.create(createProductDto);
  }

  @Patch(':id')
  async patchProduct(
    @Param('id') id: string,
    @Body() patchProductDto: PatchProductDto,
  ) {
    return this.productService.update(id, patchProductDto);
  }

  @Delete(':id')
  async deleteProduct(
    @Param('id') id: string,
  ) {
    return this.productService.remove(id);
  }
}
