import * as s from 'superstruct';
import isEmail from 'is-email';
import isUuid from 'is-uuid';

const Uuid = s.define('Uuid', (value) => isUuid.v4(value));

export const CreateProduct = s.object({
	name: s.size(s.string(), 1, 10),
	description: s.size(s.string(), 10, 100),
	price: s.min(s.number(), 0),
	tags: s.array(s.string()),
	images: s.array(s.string()),
	favoriteCount: s.min(s.integer(), 0),
});

export const PatchProduct = s.partial(CreateProduct);

export const CreateArticle = s.object({
	title: s.size(s.string(), 1, 20),
	authorId: Uuid,
	content: s.size(s.string(), 10, 500),
});

export const CreateProductComment = s.object({
	productId: Uuid,
	commenterId: Uuid,
	content: s.size(s.string(), 1, 255),
});

export const CreateArticleComment = s.object({
	articleId: Uuid,
	commenterId: Uuid,
	content: s.size(s.string(), 1, 255),
});
