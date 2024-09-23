//유효성 검사하기(클라이언트 측 데에터)
import * as s from "superstruct";

//Products
export const CreateProduct = s.object({
  name: s.size(s.string(), 1, 10),
  description: s.string(),
  price: s.min(s.number(), 0),
  tag: s.array(s.string()),
  image: s.array(s.string()),
  favoriteCount: s.min(s.number(), 0),
});

export const PatchProduct = s.partial(CreateProduct);

//Articles
export const CreateArticle = s.object({
  title: s.size(s.string(), 1, 50),
  content: s.string(),
});

export const PatchArticle = s.partial(CreateArticle);

//Comment
export const CreateCommnet = s.object({
  content: s.string(),
});

export const PatchCommnet = s.partial(CreateCommnet);
