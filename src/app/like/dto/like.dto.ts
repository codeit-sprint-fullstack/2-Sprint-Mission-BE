import { IsOptional, IsUUID, ValidateIf } from 'class-validator';

export class LikeDto {
  @IsOptional()
  @IsUUID()
  @ValidateIf((o) => !o.articleId)
  productId?: string;

  @IsOptional()
  @IsUUID()
  @ValidateIf((o) => !o.productId)
  articleId?: string;
}
