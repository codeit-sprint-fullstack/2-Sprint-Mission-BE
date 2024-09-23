import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getCommentsByProductId = async (req, res) => {
  const { productId } = req.params;

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
    where: { productId }, 
    take: parseInt(take),
    orderBy: orderConfig
  }
  if (cursor) {
    queryOptions.cursor = { id: cursor };
    queryOptions.skip = 1;
  }

  const productComments = await prisma.productComment.findMany(queryOptions);

   if (productComments.length === 0) {
     return res.status(404).send({message: 'No comments for the given aritcle ID'});
   }
  res.send(productComments);
}

export const createProductComment = async (req, res) => {
  const { productId } = req.params;
  const { content } = req.body;

  if(!content) {
    return res.status(400).send({ message: 'Content is requied' });
  }

  const productComment = await prisma.productComment.create({
    data: {
      content,
      productId,
    },
  });

  res.status(201).send(productComment);
}

export const updateProductComment = async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;

  if(!content) {
    return res.status(400).send({ message: 'Content is requied' });
  }
  const updatedProductComment = await prisma.productComment.update({
    where: { id: commentId },
    data: { content },
  });

  res.send(updatedProductComment);
}

export const deleteProductComment = async (req, res) => {
  const { commentId } = req.params;

  await prisma.productComment.delete({
    where: { id: commentId },
  });

  res.sendStatus(204);
}