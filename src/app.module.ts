import { Module } from '@nestjs/common';
import { AuthModule } from './app/auth/auth.module';
import { ProductModule } from './app/product/product.module';
import { ArticleModule } from './app/article/article.module';
import { UserModule } from './app/user/user.module';
import { CommentModule } from './app/comment/comment.module';
import { LikeModule } from './app/like/like.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './guards/jwt.guard';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    ProductModule,
    ArticleModule,
    UserModule,
    CommentModule,
    LikeModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule {}
