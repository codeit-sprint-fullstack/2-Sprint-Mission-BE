import * as s from "superstruct";

export const CreateProduct = s.object({
  name: s.size(s.string(), 1, 10),
  description: s.size(s.string(), 10, 100),
  price: s.min(s.number(), 1),
  tags: s.optional(s.array(s.string())),
  images: s.optional(s.array(s.string())),
});

export const UpdateProduct = s.partial(CreateProduct);
