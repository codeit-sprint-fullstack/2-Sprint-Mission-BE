import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleRepository } from './article.repository';
import { ArticleService } from './article.service';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { UploadModule } from 'src/database/s3/upload.module';

@Module({
  imports: [UploadModule],
  controllers: [ArticleController],
  providers: [ArticleRepository, ArticleService, PrismaService],
  exports: [ArticleService],
})
export class ArticleModule {}
