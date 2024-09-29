import * as s from "superstruct";

export const CreateProduct = s.object({
  name: s.size(s.string(), 1, 10),
  description: s.size(s.string(), 10, 100),
  price: s.min(s.number(), 1),
  tags: s.optional(s.array(s.string())),
  favoriteCount: s.optional(s.min(s.number(), 0)),
  images: s.optional(s.array(s.string())),
});

export const UpdateProduct = s.partial(CreateProduct);

export const CreateProductComment = s.object({
  content: s.string(),
});

export const UpdateProductComment = s.partial(CreateProductComment);

export const CreateArticle = s.object({
  title: s.min(s.string(), 1),
  content: s.min(s.string(), 1),
});

export const UpdateArticle = s.partial(CreateArticle);

export const CreateArticleComment = s.object({
  content: s.string(),
});

export const UpdateArticleComment = s.partial(CreateArticleComment);
