import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';
import { UserId } from 'src/decorators/user.decorator';
import { Comment } from '@prisma/client';
import { Public } from 'src/decorators/public.decorator';
import { CommentGuard } from 'src/guards/authorization.guard';

@Controller('comments')
export class CommentController {
  constructor(private readonly service: CommentService) {}

  @Public()
  @Get(':productId')
  async getCommentByProduct(
    @Param() productId: string,
    @Query('skip') skip: number,
    @Query('take') take: number,
  ): Promise<Comment[]> {
    return await this.service.getByProduct(productId, skip, take);
  }

  @Public()
  @Get(':articleId')
  async getCommentByArticle(
    @Param() articleId: string,
    @Query('skip') skip: number,
    @Query('take') take: number,
  ): Promise<Comment[]> {
    return await this.service.getByArticle(articleId, skip, take);
  }

  @Post()
  async createComment(
    @Body() data: CommentDto,
    @UserId() userId: string,
  ): Promise<Comment> {
    return await this.service.create(userId, data);
  }

  @UseGuards(CommentGuard)
  @Patch(':commentId')
  async updateComment(
    @Param() commentId: string,
    @Body() data: CommentDto,
    @UserId() userId: string,
  ): Promise<Comment> {
    return await this.service.update(userId, commentId, data);
  }

  @UseGuards(CommentGuard)
  @Delete(':commentId')
  async deleteComment(
    @Param() commentId: string,
    @UserId() userId: string,
  ): Promise<Comment> {
    return await this.service.delete(userId, { id: commentId });
  }
}
