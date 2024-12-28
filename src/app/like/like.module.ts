import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeRepository } from './like.repository';
import { LikeController } from './like.controller';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [LikeController],
  providers: [LikeRepository, LikeService, PrismaService],
  exports: [],
})
export class LikeModule {}
