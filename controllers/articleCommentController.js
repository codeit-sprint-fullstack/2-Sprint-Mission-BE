import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
    orderBy: orderConfig
  }
  if (cursor) {
    queryOptions.cursor = { id: cursor };
    queryOptions.skip = 1;
  }

  const articleComments = await prisma.articleComment.findMany(queryOptions);

   if (articleComments.length === 0) {
     return res.status(404).send({message: 'No comments for the given aritcle ID'});
   }
  res.send(articleComments);
}

export const createArticleComment = async (req, res) => {
  const { articleId } = req.params;
  const { content } = req.body;

  if(!content) {
    return res.status(400).send({ message: 'Content is requied' });
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
  const { commentId } = req.params;
  const { content } = req.body;

  if(!content) {
    return res.status(400).send({ message: 'Content is requied' });
  }
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