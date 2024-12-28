import { PartialType } from '@nestjs/swagger';
import { CreateArticleDto } from './createArticle.dto';

export class UpdateArticleDto extends PartialType(CreateArticleDto) {}
