import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CommentService } from '../services/comment.service';
import { CreateCommentDto, PatchCommentDto } from '../dto/comment.dto';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  async getCommentList(
    @Query('cursor') cursor: string = '',
  ) {
    return this.commentService.get({ cursor });
  }

  @Get(':id')
  async getProductComment(
    @Param('id') id: string,
    @Param('cursor') cursor: string = '',
  ) {
    return this.commentService.getById(id, cursor);
  }

  @Get(':id')
  async getAricleComment(
    @Param('id') id: string,
    @Param('cursor') cursor: string = '',
  ) {
    return this.commentService.getById(id, cursor);
  }
  
  @Post()
  async createProductComment(
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentService.create(createCommentDto);
  }

  @Post()
  async createArticleComment(
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentService.create(createCommentDto);
  }

  @Patch(':id')
  async patchComment(
    @Param('id') id: string,
    @Body() patchCommentDto: PatchCommentDto,
  ) {
    return this.commentService.update(id, patchCommentDto);
  }

  @Delete(':id')
  async deleteComment(
    @Param('id') id: string,
  ) {
    return this.commentService.remove(id);
  }
}