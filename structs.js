import * as s from "superstruct";
import isEmail from "is-email";

const Tag = s.size(s.string(), 1, 5);
const Tags = s.array(Tag);
const Images = s.array(s.string());
export const CreateProduct = s.object({
  name: s.size(s.string(), 1, 10),
  description: s.size(s.string(), 10, 100),
  price: s.min(s.number(), 1),
  tags: Tags,
  images: Images,
  favoriteCount: s.min(s.number(), 0)
});
export const PatchProduct = s.partial(CreateProduct);

export const CreateUser = s.object({
  email: s.define(isEmail, isEmail),
  nickName: s.string(),
  image: s.string()
});
export const CreateArticle = s.object({
  title: s.string(),
  content: s.string()
});
export const PatchArticle = s.partial(CreateArticle);

export const CreateProductComment = s.object({
  content: s.string()
});
export const PatchProductCommnet = s.partial(CreateProductComment);

export const CreateArticleComment = s.object({
  content: s.string()
});
export const PatchArticleComment = s.partial(CreateArticleComment);
