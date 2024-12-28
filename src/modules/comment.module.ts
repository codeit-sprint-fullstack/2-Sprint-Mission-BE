import { Module } from '@nestjs/common';
import { CommentController } from 'src/controllers/comment.controller';
import { CommentService } from 'src/services/comment.service';
import { CommentRepository } from 'src/repositories/comment.repository';

@Module({
  imports: [],
  controllers: [CommentController],
  providers: [CommentService, CommentRepository],
})
export class CommentModule {}
