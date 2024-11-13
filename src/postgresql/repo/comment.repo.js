import { TypeError } from '../../error.js';

export class CommentRepo {
  constructor(client) {
    this.db = client.comment;
  }

  findMany = async () => {
    const comments = await this.db.findMany({ orderBy: { createdAt: 'desc' } });

    return comments;
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

    const comments = await this.db.findMany({
      where: typeOption,
      orderBy: { createdAt: 'desc' },
      take: limit,
      include: {
        owner: {
          select: {
            nickname: true,
          },
        },
      },
      ...pageOption,
    });
    const nextCursor = comments.length ? { nextCursor: comments.at(-1).id } : {};

    return { ...nextCursor, list: comments };
  };

  findById = async id => {
    const comment = await this.db.findUnique({ where: { id } });

    return comment;
  };

  create = async data => {
    const comment = await this.db.create({ data });

    return comment;
  };

  update = async (id, data) => {
    const comment = await this.db.update({ where: { id }, data });

    return comment;
  };

  deleteById = async id => {
    const comment = await this.db.delete({ where: { id } });

    return comment;
  };
}
