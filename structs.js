import * as s from "superstruct";

export const CreateProduct = s.object({
  name: s.size(s.string(), 1, 10),
  description: s.size(s.string(), 10, 100),
  price: s.min(s.number(), 0),
  stock: s.min(s.integer(), 0),
  // tags는 optional로 설정
  tags: s.optional(s.array(s.size(s.string(), 1, 5))),
});

export const PatchProduct = s.partial(CreateProduct);

export const CreateArticle = s.object({
  title: s.size(s.string(), 1, 255),
  content: s.size(s.string(), 1, 5000),
});

export const PatchArticle = s.partial(CreateArticle);

export const CreateArticleComment = s.object({
  content: s.size(s.string(), 1, 1000),
});

export const PatchArticleComment = s.partial(CreateArticleComment);

export const CreateProductComment = s.object({
  content: s.size(s.string(), 1, 1000),
});

export const PatchProductComment = s.partial(CreateProductComment);
