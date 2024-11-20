import prisma from "../config/prisma.js";

async function create(data) {
  return await prisma.productComment.create({
    data,
		select: {
			id: true,
			content: true,
			createdAt: true,
			updatedAt: true,
			commenter: {
				select: {
          id: true,
					nickname: true,
				},
			},
		},
  });
}

async function getById(id) {
  return await prisma.productComment.findUnique({
    where: {
      id,
    },
  });
}

async function updateById(id, data) {
  return await prisma.productComment.update({
    where: {
      id,
    },
    data,
		select: {
			id: true,
			content: true,
			createdAt: true,
			updatedAt: true,
			commenter: {
				select: {
          id: true,
					nickname: true,
				},
			},
		},
  });
}

async function deleteById(id) {
  return await prisma.productComment.delete({
    where: {
      id,
    },
  });
}

async function findManyComments(productId) {
  return await prisma.productComment.findMany({
    where: {
      productId,
    },
		orderBy: {
			createdAt: "desc",
		},
    select: {
      id: true,
      content: true,
      createdAt: true,
      updatedAt: true,
      commenter: {
        select: {
          id: true,
          nickname: true,
        },
      },
    },
  });
}

export default {
	create,
	getById,
	updateById,
	deleteById,
	findManyComments,
};
