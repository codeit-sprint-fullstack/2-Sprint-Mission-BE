import * as s from 'superstruct';

const CATEGORIES = [
  'FASHION',
  'BEAUTY',
  'SPORTS',
  'ELECTRONICS',
  'HOME_INTERIOR',
  'HOUSEHOLD_SUPPLIES',
  'KITCHENWARE',
];

export const CreatePoduct = s.object({
  name: s.size(s.string(), 1, 10), 
  description: s.optional(s.size(s.string(), 10, 100)),
  category: s.enums(CATEGORIES),
  price: s.min(s.number(), 0),
  stock: s.min(s.integer(), 0),
  // tags는 optional로 설정
  tags: s.optional(s.array(s.size(s.string(), 1, 5))),
});

export const PatchProduct = s.partial(CreatePoduct);