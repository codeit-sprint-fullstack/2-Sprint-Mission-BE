import * as s from "superstruct";

export const CreateProduct = s.object({
  name: s.size(s.string(), 1, 10),
  description: s.size(s.string(), 10, 100),
  price: s.min(s.number(), 1),
  tags: s.array(s.string()),
  favoriteCount: s.min(s.number(), 0),
  images: s.array(s.string()),
});

export const PatchProduct = s.partial(CreateProduct);

export const CreateProductComment = s.object({
  content: s.string(),
});

export const PatchProductComment = s.partial(CreateProductComment);

export const CreateArticle = s.object({
  title: s.min(s.string(), 1),
  content: s.min(s.string(), 1),
});

export const PatchArticle = s.partial(CreateArticle);

export const CreateArticleComment = s.object({
  content: s.string(),
});

export const PatchArticleComment = s.partial(CreateArticleComment);
