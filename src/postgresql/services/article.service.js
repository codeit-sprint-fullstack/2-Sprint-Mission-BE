export class ArticleService {
  constructor(articleRepo) {
    this.repo = articleRepo;
  }

  getPaginatedArticles = async ({ orderBy, page, pageSize, keyword }) => {
    const totalCount = await this.repo.count(keyword);

    const list = await this.repo.findMany({
      orderBy,
      page,
      pageSize,
      keyword,
    });

    return { totalCount, list };
  };

  getArticle = async id => {
    const article = await this.repo.findById(id);

    return article;
  };

  postArticle = async body => {
    const article = await this.repo.create(body);

    return article;
  };

  patchArticle = async (id, body) => {
    const updated = await this.repo.update(id, body);

    return updated;
  };

  deleteArticle = async id => {
    const article = await this.repo.deleteById(id);

    return article;
  };
}
