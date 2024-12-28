import { Module } from '@nestjs/common';
import { ArticleController } from '../controllers/article.controller';
import { ArticleService } from '../services/article.service';
import { ArticleRepository } from '../repositories/article.repository';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [ArticleController],
  providers: [ArticleService, ArticleRepository, PrismaService],
  exports: [ArticleService],
})
export class ArticleModule {}
