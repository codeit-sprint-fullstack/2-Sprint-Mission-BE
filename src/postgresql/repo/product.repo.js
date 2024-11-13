export class ProductRepo {
  constructor(client) {
    this.db = client.product;
  }

  count = async keyword => {
    const searchOption = keyword
      ? {
          where: {
            OR: [{ name: { contains: keyword } }, { description: { contains: keyword } }],
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

    const searchOption = keyword
      ? {
          where: {
            OR: [{ name: { contains: keyword } }, { description: { contains: keyword } }],
          },
        }
      : {};

    const products = await this.db.findMany({
      ...searchOption,
      ...sortOption,
      take: pageSize,
      skip: (page - 1) * pageSize,
    });

    return products;
  };

  findById = async id => {
    const product = await this.db.findUnique({ where: { id } });

    return product;
  };

  create = async data => {
    const product = await this.db.create({ data });

    return product;
  };

  update = async (id, data) => {
    const product = await this.db.update({ where: { id }, data });

    return product;
  };

  deleteById = async id => {
    const product = await this.db.delete({ where: { id } });

    return product;
  };
}
