import prisma from "../config/prisma.js";

async function findManyComments(articleId) {
  return await prisma.articleComment.findMany({
    where: {
      articleId,
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

async function getById(id) {
  return await prisma.articleComment.findUnique({
    where: {
      id,
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

async function create({ data }) {
  return await prisma.articleComment.create({
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

async function updateById(id, data) {
  return await prisma.articleComment.update({
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
    }
  });
}

async function deleteById(id) {
  return await prisma.articleComment.delete({
    where: {
      id,
    },
  });
}

export default {
	findManyComments,
  getById,
  create,
  updateById,
  deleteById,
};
