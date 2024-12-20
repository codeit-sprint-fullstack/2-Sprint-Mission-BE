import { ProductService } from './product.service';
import { Controller, Get, Param, Post, Body, Patch, Delete, HttpCode } from '@nestjs/common';
import type { InputCreateProductDTO, InputUpdateProductDTO } from './product.dto.ts';
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    return await this.productService.getProductById(id);
  }

  @Post()
  async createProduct(@Body() body: InputCreateProductDTO) {
    return await this.productService.createProduct(body);
  }

  @Patch(':id')
  async updateProduct(@Param('id') id: string, @Body() body: InputUpdateProductDTO) {
    return await this.productService.updateProduct(id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteProduct(@Param('id') id: string) {
    return await this.productService.deleteProduct(id);
  }
}
