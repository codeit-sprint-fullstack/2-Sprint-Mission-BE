import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  content: string;
}

export class PatchCommentDto {
  @IsOptional()
  @IsString()
  content?: string;
}
