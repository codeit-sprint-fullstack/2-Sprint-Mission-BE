import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CommentRepository } from './comment.repository';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';

@Module({
  imports: [],
  controllers: [CommentController],
  providers: [CommentRepository, CommentService, PrismaService],
  exports: [CommentService],
})
export class CommentModule {}
