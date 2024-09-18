export class ArticleService {
  constructor(articleModel) {
    this.model = articleModel;
  }

  getArticlesAndCount = async ({ orderBy, page, pageSize, keyword }) => {
    const totalCount = await this.model.count(keyword);

    const list = await this.model.findMany({
      orderBy,
      page,
      pageSize,
      keyword,
    });

    return { totalCount, list };
  };

  getArticleById = async (id) => {
    return await this.model.findById(id);
  };

  postArticle = async (body) => {
    return await this.model.create(body);
  };

  patchArticleById = async (id, body) => {
    let product = await this.model.findById(id);
    if (!product) return;

    Object.keys(body).forEach((k) => {
      product[k] = body[k];
    });
    return await this.model.update(id, product);
  };

  deleteArticleById = async (id) => {
    return await this.model.deleteById(id);
  };
}
