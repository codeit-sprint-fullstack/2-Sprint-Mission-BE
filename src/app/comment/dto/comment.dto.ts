import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class CommentDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsOptional()
  @IsUUID()
  @ValidateIf((o) => !o.articleId)
  productId?: string;

  @IsOptional()
  @IsUUID()
  @ValidateIf((o) => !o.productId)
  articleId?: string;
}
