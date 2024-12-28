import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth.module';
import { ArticleModule } from './modules/article.module';
import { ProductModule } from './modules/product.module';
import { UserModule } from './modules/user.module';
import { CommentModule } from './modules/comment.module';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './guard/jwt.guard';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, ArticleModule, ProductModule, UserModule, CommentModule],
  controllers: [],
  providers: [{ provide: APP_GUARD, useClass: AccessTokenGuard }],
})
export class AppModule {}
