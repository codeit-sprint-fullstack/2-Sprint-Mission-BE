import { Module } from '@nestjs/common';
import { DBClient } from 'src/database/prisma/prisma.service';
import { CommentRepository } from './comment.repository';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';

@Module({
  imports: [],
  controllers: [CommentController],
  providers: [CommentRepository, CommentService, DBClient],
  exports: [CommentService],
})
export class CommentModule {}
