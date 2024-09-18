import { TypeError } from '../utils/error.js';

export class CommentModel {
  constructor(client) {
    this.model = client.comment;
  }

  findMany = async () => {
    return await this.model.findMany({
      orderBy: { createdAt: 'desc' },
    });
  };

  findManyAndCursor = async ({ id, limit, cursor, type }) => {
    let typeOption;
    switch (type) {
      case 'article':
        typeOption = { articleId: id };
        break;
      case 'product':
        typeOption = { productId: id };
        break;
      default:
        throw new TypeError('find type must be article or product');
    }
    const pageOption = cursor ? { skip: 1, cursor: { id: cursor } } : {};

    const comments = await this.model.findMany({
      where: typeOption,
      orderBy: { createdAt: 'desc' },
      take: limit,
      ...pageOption,
    });
    const nextCursor = comments.at(-1).id;

    return { nextCursor, list: comments };
  };

  findById = async (id) => {
    return this.model.findUnique({
      where: {
        id,
      },
    });
  };

  create = async (data) => {
    return await this.model.create({
      data,
    });
  };

  update = async (id, data) => {
    return await this.model.update({
      where: { id },
      data,
    });
  };

  deleteById = async (id) => {
    return await this.model.delete({
      where: { id },
    });
  };
}
