export class UserDB {
  constructor(client) {
    this.db = client.user;
  }

  count = async (keyword) => {
    const searchOption = keyword
      ? { where: { nickname: { contains: keyword } } }
      : {};

    const count = await this.db.count(searchOption);

    return count;
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
      ? { where: { nickname: { contains: keyword } } }
      : {};

    const users = await this.db.findMany({
      ...searchOption,
      ...sortOption,
      take: pageSize,
      skip: page,
    });

    return users;
  };
}
