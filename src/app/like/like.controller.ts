import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { LikeResponse, LikeService } from './like.service';
import { Like } from '@prisma/client';
import { UserId } from 'src/decorators/user.decorator';
import { LikeDto } from './dto/like.dto';
import { Public } from 'src/decorators/public.decorator';

@Controller('likes')
export class LikeController {
  constructor(private readonly service: LikeService) {}

  @Get()
  async getLikesByUser(@UserId() userId: string): Promise<LikeResponse> {
    return await this.service.getByUser(userId);
  }

  @Public()
  @Get('product/:productId')
  async getLikesByProduct(
    @Param('productId') productId: string,
  ): Promise<LikeResponse> {
    return await this.service.getByProduct(productId);
  }

  @Public()
  @Get('article/:articleId')
  async getLikesByArticle(
    @Param('articleId') articleId: string,
  ): Promise<LikeResponse> {
    return await this.service.getByArticle(articleId);
  }

  @Post()
  async createLike(
    @Body() data: LikeDto,
    @UserId() userId: string,
  ): Promise<Like> {
    return await this.service.create(userId, data);
  }

  @Delete('product/:productId')
  async deleteLikeByProduct(
    @Param('productId') productId: string,
    @UserId() userId: string,
  ): Promise<null> {
    return await this.service.deleteByProduct(userId, productId);
  }

  @Delete('article/:articleId')
  async deleteLikeByArticle(
    @Param('articleId') articleId: string,
    @UserId() userId: string,
  ): Promise<null> {
    return await this.service.deleteByProduct(userId, articleId);
  }
}
