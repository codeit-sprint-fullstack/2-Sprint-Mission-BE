export class UserService {
  constructor(userDB) {
    this.db = userDB;
  }

  getPaginatedUsers = async ({ orderBy, page, pageSize, keyword }) => {
    const totalCount = await this.db.count(keyword);

    const list = await this.db.findMany({
      orderBy,
      page,
      pageSize,
      keyword,
    });

    return { totalCount, list };
  };
}
