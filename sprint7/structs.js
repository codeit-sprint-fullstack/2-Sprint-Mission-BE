import * as s from 'superstruct';
import isEmail from 'is-email';
import isUuid from 'is-uuid';

const Uuid = s.define('Uuid', (value) => isUuid.v4(value));
const email = s.define('email', (value) => isEmail(value));

export const CreateUser = s.object({
	email: email,
	nickname: s.size(s.string(), 1, 20),
	password: s.string()
});
export const PatchUser = s.partial(CreateUser);
	// * User id 는 따로 받아야 함.

export const CreateProduct = s.object({
	name: s.size(s.string(), 1, 10),
	description: s.size(s.string(), 10, 100),
	price: s.min(s.number(), 0),
	tags: s.size(s.array(s.string()), 0, 15),
	images: s.size(s.array(s.string()), 1, 2),
	favoriteCount: s.min(s.integer(), 0),
});
export const PatchProduct = s.partial(CreateProduct);
	// * Product id 는 따로 받아야 함.

export const CreateArticle = s.object({
	title: s.size(s.string(), 1, 50),
	authorId: Uuid,
	content: s.size(s.string(), 10, 500),
});
export const PatchArticle = s.partial(CreateArticle);
	// * Article id 는 따로 받아야 함.

export const CreateProductComment = s.object({
	productId: Uuid,
	commenterId: Uuid,
	content: s.size(s.string(), 1, 255),
});
	// * Patch 는 위 데이터에 id 추가.

export const CreateArticleComment = s.object({
	articleId: Uuid,
	commenterId: Uuid,
	content: s.size(s.string(), 1, 255),
});
	// * Patch 는 위 데이터에 id 추가.
