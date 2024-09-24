export class ProductDB {
  constructor(client) {
    this.db = client.product;
  }

  count = async (keyword) => {
    const searchOption = keyword
      ? {
          where: {
            OR: [
              { name: { contains: keyword } },
              { description: { contains: keyword } },
            ],
          },
        }
      : {};

    const count = await this.db.count(searchOption);

    return count;
  };

  findMany = async ({ orderBy, page, pageSize, keyword }) => {
    const sortOption = {
      orderBy: { createdAt: orderBy === 'recent' ? 'desc' : 'asc' },
    };
    const searchOption = keyword
      ? {
          where: {
            OR: [
              { name: { contains: keyword } },
              { description: { contains: keyword } },
            ],
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

  findById = async (id) => {
    const product = await this.db.findUnique({ where: { id } });

    return product;
  };

  create = async (data) => {
    const product = await this.db.create({ data });

    return product;
  };

  update = async (id, data) => {
    const product = await this.db.update({ where: { id }, data });

    return product;
  };

  deleteById = async (id) => {
    const product = await this.db.delete({ where: { id } });

    return product;
  };
}
