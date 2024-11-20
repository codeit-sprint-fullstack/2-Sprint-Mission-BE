import articleRepository from '../repositories/articleRepository.js';

async function getArticles({ page = 1, pageSize = 12, sort = "recent", keyword = "" }) {
	page = parseInt(page);
	pageSize = parseInt(pageSize);

	if (page < 1) {
		page = 1;
	}
	const skip = (page - 1) * pageSize;
	const take = pageSize;

	const query = keyword ? {
		OR: [{
				title: { contains: keyword }
			},
			{
				content: { contains: keyword }
			}]
		}
	: {};
	let orderBy;
	switch (sort) {
		case "favorite":
			orderBy = { favoriteCount: "desc" };
			break;
		case "oldest":
			orderBy = { createdAt: "asc" };
			break;
		case "recent":
		default:
			orderBy = { createdAt: "desc" };
	}

	const { list, totalCount } = await articleRepository.getArticles({ skip, take, orderBy, where: query });

	return {
		list,
		totalCount
	};
}

async function create(data) {
	return await articleRepository.create(data);
}

async function updateById(id, data) {
	return await articleRepository.updateById(id, data);
}

async function deleteById(id) {
	return await articleRepository.deleteById(id);
}

async function getById(id, userId) {
	const article = await articleRepository.getById(id);
	if (!article) {
		throw new Error("Article not found");
	}
	const favorite = await articleRepository.getArticleFavorite(id, userId);
	try {
		article.isFavorite = favorite !== null;
	} catch (err) {
		article.isFavorite = false;
	}
	return article;
}

async function favorite(articleId, userId) {
  return await articleRepository.likeArticle(articleId, userId);
}

async function unfavorite(articleId, userId) {
  return await articleRepository.unlikeArticle(articleId, userId);
}

export default {
	getArticles,
	create,
	updateById,
	deleteById,
	getById,
	favorite,
	unfavorite,
};
