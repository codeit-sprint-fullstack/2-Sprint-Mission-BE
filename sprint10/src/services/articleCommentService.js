import articleCommentRepository from '../repositories/articleCommentRepository.js';

async function findManyComments(articleId) {
	return await articleCommentRepository.findManyComments(articleId);
}

async function create(articleId, userId, content) {
	return await articleCommentRepository.create({
		data: {
			articleId,
			commenterId: userId,
			content,
		},
	});
}

async function updateById(id, data) {
	return await articleCommentRepository.updateById(id, data);
}

async function deleteById(id) {
	return await articleCommentRepository.deleteById(id);
}

export default {
	findManyComments,
	create,
	updateById,
	deleteById,
};
