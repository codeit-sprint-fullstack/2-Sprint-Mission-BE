import { ArticleRepository } from '#repositories/article.repository.js';
import { ArticleDTO } from '#types/dtos.type.js';
import { FindOptions } from '#types/options.type.js';
import assertExist from '#utils/assertExist.js';

export class ArticleService {
  constructor(private readonly articleRepository: ArticleRepository) {}

  getPaginatedArticles = async ({ orderBy, page, pageSize, keyword }: FindOptions) => {
    const totalCount = await this.articleRepository.count(keyword);

    const list = await this.articleRepository.findMany({
      orderBy,
      page,
      pageSize,
      keyword,
    });

    return { totalCount, list };
  };

  getArticle = async (id: string) => {
    const article = await this.articleRepository.findById(id);
    assertExist(article);

    return article;
  };

  postArticle = async (body: ArticleDTO) => {
    const article = await this.articleRepository.create(body);

    return article;
  };

  patchArticle = async (id: string, body: ArticleDTO) => {
    const target = await this.articleRepository.findById(id);
    assertExist(target);

    const updated = await this.articleRepository.update(id, body);

    return updated;
  };

  deleteArticle = async (id: string) => {
    const target = await this.articleRepository.findById(id);
    assertExist(target);

    const article = await this.articleRepository.deleteById(id);

    return article;
  };

  postArticleLike = async (articleId: string, userId: string) => {
    const target = await this.articleRepository.findById(articleId);
    assertExist(target);

    const article = await this.articleRepository.like(articleId, userId);

    return { ...article, isLiked: true };
  };

  deleteArticleLike = async (articleId: string, userId: string) => {
    const target = await this.articleRepository.findById(articleId);
    assertExist(target);

    const article = await this.articleRepository.unlike(articleId, userId);

    return { ...article, isLiked: false };
  };
}
