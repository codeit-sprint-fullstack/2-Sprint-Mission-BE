import prisma from '../utils/prismaClient.js';
import { assert } from 'superstruct';
import { CreateArticleComment, PatchArtcleComment } from "../structs.js";

export const getCommentsByArticleId = async (req, res) => {
  const { articleId } = req.params;

  // cursor 방식의 페이지네이션
  const { cursor, take = 10, orderBy = 'recent' } = req.query;

  let orderConfig;
  switch (orderBy) {
    case 'oldest' :
      orderConfig = { createdAt : 'asc' };
      break;
    case 'recent' :
    default : 
      orderConfig = { createdAt : 'desc' };
  }
  const queryOptions = {
    where: { articleId }, 
    take: parseInt(take),
    orderBy: orderConfig,
    ...(cursor && { 
      cursor: { id: cursor}, 
      skip: 1 
    })
  };

  const articleComments = await prisma.articleComment.findMany(queryOptions);

  res.send(articleComments);
}

export const createArticleComment = async (req, res) => {
  assert (req.body, CreateArticleComment);

  const { articleId } = req.params;
  const { content } = req.body;

  if(!content) {
    return res.status(400).send({ message: 'Content is required' });
  }

  const articleComment = await prisma.articleComment.create({
    data: {
      content,
      articleId,
    },
  });

  res.status(201).send(articleComment);
}

export const updateArticleComment = async (req, res) => {
  assert(req.body, PatchArtcleComment);

  const { commentId } = req.params;
  const { content } = req.body;

  const updatedArticleComment = await prisma.articleComment.update({
    where: { id: commentId },
    data: { content },
  });

  res.send(updatedArticleComment);
}

export const deleteArticleComment = async (req, res) => {
  const { commentId } = req.params;

  await prisma.articleComment.delete({
    where: { id: commentId },
  });

  res.sendStatus(204);
}