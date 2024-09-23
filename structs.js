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
