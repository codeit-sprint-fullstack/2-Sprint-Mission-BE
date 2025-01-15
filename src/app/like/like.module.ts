import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeRepository } from './like.repository';
import { LikeController } from './like.controller';
import { DBClient } from 'src/database/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [LikeController],
  providers: [LikeRepository, LikeService, DBClient],
  exports: [],
})
export class LikeModule {}
