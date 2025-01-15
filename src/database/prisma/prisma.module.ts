import { Module } from '@nestjs/common';
import { DBClient } from './prisma.service';

@Module({
  providers: [DBClient],
  exports: [DBClient],
})
export class DBModule {}
