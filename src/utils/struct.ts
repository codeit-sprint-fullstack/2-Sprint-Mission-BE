import isEmail from 'is-email';
import isUuid from 'is-uuid';
import * as s from 'superstruct';

export const Uuid = s.define('Uuid', value => isUuid.v4(value as string));
export const Email = s.define('Email', isEmail as s.Validator);
export const Cursor = s.optional(Uuid);

export const SignIn = s.object({
  email: Email,
  password: s.string(),
});

export const CreateUser = s.object({
  email: Email,
  nickname: s.string(),
  password: s.string(),
  salt: s.string(),
});

export const CreateProduct = s.object({
  name: s.size(s.string(), 1, 10),
  description: s.size(s.string(), 10, 100),
  price: s.min(s.integer(), 1),
  tags: s.optional(s.array(s.size(s.string(), 1, 5))),
  ownerId: Uuid,
  file: s.optional(s.any()),
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

export const PatchUser = s.object({
  nickname: s.optional(s.string()),
  password: s.optional(s.string()),
  salt: s.optional(s.string()),
  refreshToken: s.optional(s.string()),
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