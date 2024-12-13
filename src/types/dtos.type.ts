import { Article, Comment, Product, User } from '@prisma/client';

export interface ModelBase {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ArticleDTO extends Omit<Article, keyof ModelBase> {}
export interface UserDTO extends Omit<User, keyof ModelBase> {}
export interface SignDTO extends Pick<User, 'email' | 'password'> {}
export interface CommentDTO extends Omit<Comment, keyof ModelBase> {}
export interface ProductDTO extends Omit<Product, keyof ModelBase> {
  tags: string[];
  file: { originalname: string; filename: string };
}
