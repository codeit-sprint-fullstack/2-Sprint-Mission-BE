export class ArticleRepo {
  constructor(client) {
    this.db = client.article;
  }

  count = async keyword => {
    const searchOption = keyword
      ? {
          where: {
            OR: [{ title: { contains: keyword } }, { content: { contains: keyword } }],
          },
        }
      : {};

    const count = await this.db.count(searchOption);

    return count;
  };

  findMany = async ({ orderBy, page, pageSize, keyword }) => {
    let sortOption;
    switch (orderBy) {
      case 'like':
        sortOption = { orderBy: { likeCount: 'desc' } };
        break;
      case 'recent':
      default:
        sortOption = { orderBy: { createdAt: 'desc' } };
    }

    const searchOption = keyword ? { where: { title: { contains: keyword } } } : {};

    const articles = await this.db.findMany({
      ...searchOption,
      ...sortOption,
      take: pageSize,
      skip: (page - 1) * pageSize,
      include: {
        owner: {
          select: {
            nickname: true,
          },
        },
      },
    });

    return articles;
  };

  findById = async id => {
    const article = await this.db.findUnique({
      where: { id },
      include: {
        owner: {
          select: {
            nickname: true,
          },
        },
      },
    });

    return article;
  };

  create = async data => {
    const article = await this.db.create({ data });

    return article;
  };

  update = async (id, data) => {
    const article = await this.db.update({ where: { id }, data });

    return article;
  };

  deleteById = async id => {
    const article = await this.db.delete({ where: { id } });

    return article;
  };
}
