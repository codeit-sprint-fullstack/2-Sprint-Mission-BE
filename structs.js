import * as s from "superstruct";
import isUuid from "is-uuid";

export const CreateProduct = s.object({
  name: s.size(s.string(), 1, 60),
  description: s.string(),
  price: s.min(s.number(), 0),
  tags: s.size(s.array(s.string()), 0, 10), //최대 10개까지,
  images: s.size(s.array(s.string()), 0, 3), //최대 3개
  favoriteCount: s.min(s.integer(), 0),
  userId: s.number(),
});

export const PatchProduct = s.partial(CreateProduct);

export const CreateArticle = s.object({
  title: s.size(s.string(), 1, 60),
  content: s.string(),
});

export const PatchArticle = s.partial(CreateArticle);

const Uuid = s.define("Uuid", (value) => isUuid.v4(value));

export const CreateComment = s.object({
  productId: s.optional(s.number()),
  articleId: s.optional(s.number()),
  content: s.string(),
});

export const PatchComment = s.object({
  content: s.string(),
});
