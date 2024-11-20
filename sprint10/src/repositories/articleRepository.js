import prisma from "../config/prisma.js";

async function getArticles({ skip, take, orderBy, where }) {
	const list = await prisma.article.findMany({
		skip,
		take,
		orderBy,
		where,
		select: {
			id: true,
			author: {
				select: {
					nickname: true,
				}
			},
			title: true,
			content: true,
			images: true,
			favoriteCount: true,
			createdAt: true,
			updatedAt: true,
		}
	});
	const totalCount = await prisma.article.count({
		where,
	});
	return { list, totalCount };
}

async function create(data) {
	return await prisma.article.create({
		data,
	});
}

async function updateById(id, data) {
	return await prisma.article.update({
		where: {
			id,
		},
		data,
	});
}

async function deleteById(id) {
	return await prisma.article.delete({
		where: {
			id,
		},
	});
}

async function getById(id) {
	return await prisma.article.findUnique({
		where: {
			id,
		},
		select: {
			id: true,
			author: {
				select: {
					id: true,
					nickname: true,
				}
			},
			title: true,
			content: true,
			images: true,
			favoriteCount: true,
			createdAt: true,
			updatedAt: true,
		}
	});
}

async function likeArticle(articleId, userId) {
	return await prisma.$transaction([
		prisma.articleFavorite.create({
			data: {
				articleId,
				userId,
			},
		}),
		prisma.article.update({
			where: {
				id: articleId,
			},
			data: {
				favoriteCount: {
					increment: 1,
				},
			},
		})
	]);
}

async function unlikeArticle(articleId, userId) {
	return await prisma.$transaction([
		prisma.articleFavorite.delete({
			where: {
				userId_articleId: {
					userId,
					articleId,
				},
			},
		}),
		prisma.article.update({
			where: {
				id: articleId,
			},
			data: {
				favoriteCount: {
					decrement: 1,
				},
			},
		})
	]);
}

async function getArticleFavorite(articleId, userId) {
	return await prisma.articleFavorite.findUnique({
		where: {
			userId_articleId: {
				userId,
				articleId,
			},
		},
	});
}

export default {
	getArticles,
	create,
	updateById,
	deleteById,
	getById,
	likeArticle,
	unlikeArticle,
	getArticleFavorite,
};
