import * as s from 'superstruct';

export const CreateProduct = s.object({
    name: s.size(s.string(), 1, 10),
    description: s.size(s.string(), 10, 100),
    price: s.min(s.number(), 0),
    tags: s.array(s.string()),
    images: s.array(s.string()),
    // comments: s.array(s.string()),
});

export const CreateArticle = s.object({
    title: s.size(s.string(), 1, 30),
    content: s.size(s.string(), 10, 100),
    // comments: s.array(s.string()),
    images: s.array(s.string()),
});

export const CreateComment = s.object({
    content: s.size(s.string(), 1, 10),
});

export const PatchProduct = s.partial(CreateProduct);
export const PatchArticle = s.partial(CreateArticle);
export const PatchComment = s.partial(CreateComment);