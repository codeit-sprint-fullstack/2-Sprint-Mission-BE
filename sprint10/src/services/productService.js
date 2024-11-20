import productRepository from '../repositories/productRepository.js';

async function getProducts({ page = 1, pageSize = 10, sort = "recent", keyword = "" }) {
  page = parseInt(page);
  pageSize = parseInt(pageSize);

  if (page < 1) {
    page = 1;
  }
  const skip = (page - 1) * pageSize;
  const take = pageSize;

  const query = keyword ? {
		OR: [{
				name: { contains: keyword }
			},
			{
				description: { contains: keyword }
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

  const { products: list, totalCount } = await productRepository.getProducts({ skip, take, orderBy, where: query });

  return {
    list,
    totalCount
  };
}

async function getById(id, userId) {
  const product = await productRepository.getById(id);
  if (!product) {
    throw new Error('Product not found');
  }
  const favorite = await productRepository.getProductFavorite(id, userId);
  console.log('Favorite:', favorite);
  console.log('userId', userId);
  try {
    product.isFavorite = favorite !== null;
  } catch (err) {
    product.isFavorite = false;
  }
  return product;
}

async function updateById(id, product) {
  return await productRepository.updateById(id, product);
}

async function create(product) {
  return await productRepository.save(product);
}

async function deleteById(id) {
  return await productRepository.deleteById(id);
}

async function favorite(productId, userId) {
  return await productRepository.likeProduct(productId, userId);
}

async function unfavorite(productId, userId) {
  return await productRepository.unlikeProduct(productId, userId);
}

export default {
  getProducts,
  getById,
  updateById,
  create,
  deleteById,
  favorite,
  unfavorite,
};
