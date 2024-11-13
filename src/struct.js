import isUuid from 'is-uuid';
import * as s from 'superstruct';

export const MongodbId = s.size(s.string(), 24, 24);
export const Uuid = s.define('Uuid', value => isUuid.v4(value));
export const Cursor = s.optional(Uuid);

export const CreateProduct = s.object({
  name: s.size(s.string(), 1, 10),
  description: s.size(s.string(), 10, 100),
  price: s.min(s.integer(), 1),
  tags: s.optional(s.array(s.max(s.string(), 5))),
  images: s.optional(s.array(s.string())),
});

export const CreateArticle = s.object({
  title: s.string(),
  content: s.string(),
  images: s.optional(s.array(s.string())),
  ownerId: Uuid,
});

export const CreateComment = s.object({
  content: s.string(),
  ownerId: Uuid,
});

export const PatchProduct = s.partial(CreateProduct);
export const PatchArticle = s.partial(CreateArticle);
export const PatchComment = s.object({ content: s.string() });

export const PutComment = s.object({
  content: s.string(),
  ownerId: Uuid,
  articleId: s.nullable(Uuid),
  productId: s.nullable(Uuid),
});
