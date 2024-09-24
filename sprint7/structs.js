import * as s from 'superstruct';
import isEmail from 'is-email';
import isUuid from 'is-uuid';

const Uuid = s.define('Uuid', (value) => isUuid.v4(value));

export const CreateProduct = s.object({
	name: s.size(s.string(), 1, 10),
	description: s.size(s.string(), 10, 100),
	price: s.min(s.number(), 0),
	tags: s.set(s.string()),
	images: s.set(s.string()),
	favoriteCount: s.min(s.integer(), 0),
});

export const PatchProduct = s.object({
	id: Uuid,
	...s.partial(CreateProduct),
});
// export const
