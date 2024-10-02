import * as s from "superstruct";
import isEmail from "is-email";
import isUuid from "is-uuid";

const Uuid = s.define("Uuid", (value) => isUuid.v4(value));

export const CreateProduct = s.object({
  name: s.size(s.string(), 1, 30),
  description: s.string(),
  price: s.min(s.number(), 0),
  tags: s.array(s.size(s.string(), 0, 20)),
});

export const PatchProduct = s.partial(CreateProduct);

export const CreateArticle = s.object({
  title: s.size(s.string(), 1, 60),
  content: s.string(),
});

export const PatchArticle = s.partial(CreateArticle);
