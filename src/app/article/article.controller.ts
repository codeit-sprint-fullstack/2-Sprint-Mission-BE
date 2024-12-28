import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ArticleResponse, ArticleService } from './article.service';
import { Article } from '@prisma/client';
import { CreateArticleDto } from './dto/createArticle.dto';
import { UpdateArticleDto } from './dto/updateArticle.dto';
import { UserId } from 'src/decorators/user.decorator';
import { Public } from 'src/decorators/public.decorator';
import { ArticleGuard } from 'src/guards/authorization.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('articles')
export class ArticleController {
  constructor(private service: ArticleService) {}

  @Public()
  @Get()
  async getArticles(
    @Query()
    queries: {
      skip?: number;
      take?: number;
      orderBy?: 'oldest' | 'newest';
      keyword?: string;
    },
  ): Promise<ArticleResponse> {
    return this.service.get(queries);
  }

  @Public()
  @Get(':articleId')
  async getArticleById(
    @Param('articleId') articleId: string,
  ): Promise<Article> {
    return this.service.getById(articleId);
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async createArticle(
    @UserId() userId: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() data: CreateArticleDto,
  ): Promise<Article> {
    return await this.service.create(userId, file, data);
  }

  @UseGuards(ArticleGuard)
  @Patch(':articleId')
  async updateArticle(
    @Param('articleId') articleId: string,
    @Body() data: UpdateArticleDto,
  ): Promise<Article> {
    return await this.service.update(articleId, data);
  }

  @UseGuards(ArticleGuard)
  @Delete(':articleId')
  async deleteArticle(
    @Param('articleId') articleId: string,
    @UserId() userId: string,
  ) {
    return await this.service.delete(articleId, userId);
  }
}
