import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ArticleService } from 'src/app/article/article.service';
import { CommentService } from 'src/app/comment/comment.service';
import { ProductService } from 'src/app/product/product.service';

@Injectable()
export class ProductGuard implements CanActivate {
  constructor(private readonly product: ProductService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user;

    const productId = request.params.productId;
    const product = await this.product.getById(productId);
    const ownerId = product?.ownerId;

    if (userId !== ownerId) {
      throw new ForbiddenException('권한이 없습니다');
    }

    return true;
  }
}

@Injectable()
export class ArticleGuard implements CanActivate {
  constructor(private readonly article: ArticleService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user;

    const articleId = request.params.productId;
    const article = await this.article.getById(articleId);
    const ownerId = article?.writerId;

    if (userId !== ownerId) {
      throw new ForbiddenException('권한이 없습니다');
    }

    return true;
  }
}

@Injectable()
export class CommentGuard implements CanActivate {
  constructor(private readonly comment: CommentService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user;

    const commentId = request.params.productId;
    const comment = await this.comment.getById(commentId);
    const ownerId = comment?.writerId;

    if (userId !== ownerId) {
      throw new ForbiddenException('권한이 없습니다');
    }

    return true;
  }
}
