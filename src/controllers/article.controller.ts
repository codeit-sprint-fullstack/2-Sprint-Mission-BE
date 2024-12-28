import { assert } from 'superstruct';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ArticleService } from '../services/article.service';
import { CreateArticleDto, PatchArticleDto } from '../dto/article.dto';
import { CreateArticle, PatchArticle, Uuid } from 'src/utils/struct';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  async getArticleList(
    @Query('page') page: number = 0,
    @Query('pageSize') pageSize: number = 10,
    @Query('orderBy') orderBy: string = 'recent',
    @Query('keyword') keyword: string = '',
  ) {
    return this.articleService.get({ page, pageSize, orderBy, keyword });
  }

  @Get(':id')
  async getArticle(@Param('id') id: string) {
    assert(id, Uuid);
    return this.articleService.getById(id);
  }

  @Post()
  async createArticle(@Body() createArticleDto: CreateArticleDto) {
    assert(createArticleDto, CreateArticle);
    return this.articleService.create(createArticleDto);
  }

  @Patch(':id')
  async patchArticle(
    @Param('id') id: string,
    @Body() patchArticleDto: PatchArticleDto,
  ) {
    assert(id, Uuid);
    assert(patchArticleDto, PatchArticle);
    return this.articleService.update(id, patchArticleDto);
  }

  @Delete(':id')
  async deleteArticle(@Param('id') id: string) {
    assert(id, Uuid);
    return this.articleService.remove(id);
  }

  @Post(':id/like')
  async likeArticle(@Param('id') id: string) {
    assert(id, Uuid);
    return this.articleService.like(id);
  }

  @Delete(':id/like')
  async unlikeArticle(@Param('id') id: string) {
    assert(id, Uuid);
    return this.articleService.unlike(id);
  }
}
