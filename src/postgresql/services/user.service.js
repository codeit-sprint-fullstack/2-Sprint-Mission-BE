export class UserService {
  constructor(userRepo) {
    this.repo = userRepo;
  }

  getPaginatedUsers = async ({ orderBy, page, pageSize, keyword }) => {
    const totalCount = await this.repo.count(keyword);

    const list = await this.repo.findMany({
      orderBy,
      page,
      pageSize,
      keyword,
    });

    return { totalCount, list };
  };
}
