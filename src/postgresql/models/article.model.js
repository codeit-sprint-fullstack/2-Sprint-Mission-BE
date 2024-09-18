export class ArticleModel {
  constructor(client) {
    this.model = client.article;
  }

  count = async (keyword) => {
    const searchOption = keyword
      ? { where: { productSearchQuery: { contains: keyword } } }
      : {};

    return await this.model.count(searchOption);
  };

  findMany = async ({ orderBy, page, pageSize, keyword }) => {
    let sortOption;
    switch (orderBy) {
      case 'like':
        sortOption = { orderBy: { like: 'desc' } };
        break;
      case 'recent':
      default:
        sortOption = { orderBy: { createdAt: 'desc' } };
    }

    const searchOption = keyword
      ? { where: { searchQuery: { contains: keyword } } }
      : {};

    return await this.model.findMany({
      ...searchOption,
      ...sortOption,
      take: pageSize,
      skip: page,
    });
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
