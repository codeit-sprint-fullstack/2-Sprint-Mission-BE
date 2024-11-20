import prisma from "../config/prisma.js";

async function getProducts({ skip, take, orderBy, where }) {
	const products = await prisma.product.findMany({
		skip,
		take,
		orderBy,
		where,
		include: {
			owner: {
				select: {
					id: true,
					nickname: true,
				},
			},
		}
	});
	const totalCount = await prisma.product.count({
		where,
	});
	return { products, totalCount };
}

async function getById(id) {
	return await prisma.product.findUnique({
		where: {
			id,
		},
		include: {
			owner: {
				select: {
					id: true,
					nickname: true,
				},
			},
		}
	});
}

async function updateById(id, product) {
	return await prisma.product.update({
		where: {
			id,
		},
		data: {
			...product,
		},
	});
}

async function save(product) {
	return await prisma.product.create({
		data: {
			...product
		},
	});
}

async function deleteById(id) {
	return await prisma.product.delete({
		where: {
			id,
		},
	});
};

async function likeProduct(productId, userId) {
	return await prisma.$transaction([
		prisma.productFavorite.create({
			data: {
				productId,
				userId,
			},
		}),
		prisma.product.update({
			where: {
				id: productId,
			},
			data: {
				favoriteCount: {
					increment: 1,
				},
			},
		})
	]);
}

async function unlikeProduct(productId, userId) {
	return await prisma.$transaction([
		prisma.productFavorite.delete({
			where: {
				userId_productId: {
					userId,
					productId,
				},
			},
		}),
		prisma.product.update({
			where: {
				id: productId,
			},
			data: {
				favoriteCount: {
					decrement: 1,
				},
			},
		})
	]);
}

async function getProductFavorite(productId, userId) {
	return await prisma.productFavorite.findUnique({
		where: {
			userId_productId: {
				userId,
				productId,
			},
		},
	});
}

export default {
	getProducts,
	getById,
	updateById,
	save,
	deleteById,
	likeProduct,
	unlikeProduct,
	getProductFavorite,
};
