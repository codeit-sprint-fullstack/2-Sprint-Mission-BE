import * as s from 'superstruct';
import isUuid from 'is-uuid';

const MongodbId = s.size(s.string(), 24, 24);
const Uuid = s.define('Uuid', (value) => isUuid.v4(value));
const Cursor = s.optional(Uuid);

const CreateProduct = s.object({
  name: s.size(s.string(), 1, 10),
  description: s.size(s.string(), 10, 100),
  price: s.min(s.integer(), 1),
  tags: s.optional(s.array(s.max(s.string(), 5))),
  images: s.optional(s.array(s.string())),
});

const CreateArticle = s.object({
  title: s.string(),
  content: s.string(),
  images: s.optional(s.array(s.string())),
  ownerId: Uuid,
});

const CreateComment = s.object({
  content: s.string(),
  ownerId: Uuid,
});

const PatchProduct = s.partial(CreateProduct);
const PatchArticle = s.partial(CreateArticle);
const PatchComment = s.object({ content: s.string() });

export {
  MongodbId,
  Uuid,
  Cursor,
  CreateProduct,
  CreateArticle,
  CreateComment,
  PatchProduct,
  PatchArticle,
  PatchComment,
};
