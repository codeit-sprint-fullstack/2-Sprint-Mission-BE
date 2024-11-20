import productCommentRepository from '../repositories/productCommentRepository.js';

async function create(data) {
  try {
    const createdComment = await productCommentRepository.create(data);

    return createdComment;
  } catch (error) {
    throw error;
  }
}

async function findManyComments(productId) {
  try {
    const comments = await productCommentRepository.findManyComments(productId);

    return comments;
  } catch (error) {
    throw error;
  }
}

async function update(commentId, data) {
  try {
    const updatedComment = await productCommentRepository.updateById(commentId, data);

    return updatedComment;
  } catch (error) {
    throw error;
  }
}

async function deleteById(commentId) {
  try {
    const deletedComment = await productCommentRepository.deleteById(commentId);

    return deletedComment;
  } catch (error) {
    throw error;
  }
}

export default {
  create,
  findManyComments,
	update,
	deleteById,
};
