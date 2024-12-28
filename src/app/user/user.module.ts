import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, UserRepository, PrismaService],
  exports: [],
})
export class UserModule {}
