export class ArticleService {
  constructor(articleDB) {
    this.db = articleDB;
  }

  getPaginatedArticles = async ({ orderBy, page, pageSize, keyword }) => {
    const totalCount = await this.db.count(keyword);

    const list = await this.db.findMany({
      orderBy,
      page,
      pageSize,
      keyword,
    });

    return { totalCount, list };
  };

  getArticle = async (id) => {
    const article = await this.db.findById(id);

    return article;
  };

  postArticle = async (body) => {
    const article = await this.db.create(body);

    return article;
  };

  patchArticle = async (id, body) => {
    const article = await this.db.findById(id);
    if (!article) return;

    Object.keys(body).forEach((k) => {
      article[k] = body[k];
    });

    const updated = await this.db.update(id, article);

    return updated;
  };

  deleteArticle = async (id) => {
    const article = await this.db.deleteById(id);

    return article;
  };
}
