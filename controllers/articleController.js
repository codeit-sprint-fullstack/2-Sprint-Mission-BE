import prisma from '../models/articleModel.js';
import { assert } from 'superstruct';
import { CreateArticle, PatchArticle } from '../structs.js';
import { handleError } from '../utils/handleError.js';

// 게시글 등록
export const createArticle = async (req, res, next) => {
  try {
    assert(req.body, CreateArticle);
    const { title, content } = req.body;
    const newArticle = await prisma.article.create({
      data: { title, content }
    });
    res.locals.data = newArticle;
    res.status(201).json(newArticle);
  } catch (err) {
    handleError(err, next);
  }
};

// 게시글 조회
export const getArticleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const article = await prisma.article.findUniqueOrThrow({
      where: { id },
      include: {
        comments: {
          select: {
            content: true,
            createdAt: true,
            ownerUserId: true
          }
        }
      }
    });
    const { updatedAt, ...filteredArticle } = article;
    res.locals.data = filteredArticle;
    res.json(filteredArticle);
  } catch (err) {
    handleError(err, next);
  }
};

// 게시글 수정
export const updateArticle = async (req, res, next) => {
  try {
    assert(req.body, PatchArticle);
    const { id } = req.params;
    const { title, content } = req.body;
    const article = await prisma.article.update({
      where: { id },
      data: { title, content }
    });
    res.locals.data = article;
    res.json(article);
  } catch (err) {
    handleError(err, next);
  }
};

// 게시글 삭제
export const deleteArticle = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.article.delete({
      where: { id }
    });
    res.status(204).json();
  } catch (err) {
    handleError(err, next);
  }
};

// 게시글 목록 조회
export const getArticles = async (req, res, next) => {
  try {
    const {
      page = 1,
      pageSize = 10,
      order = 'recent',
      keyword = ''
    } = req.query;

    const offset = (page - 1) * pageSize;
    const articles = await prisma.article.findMany({
      where: {
        OR: [
          { title: { contains: keyword } },
          { content: { contains: keyword } }
        ]
      },
      orderBy: order === 'recent' ? { createdAt: 'desc' } : {},
      skip: offset,
      take: parseInt(pageSize)
    });
    res.json(articles);
  } catch (err) {
    handleError(err, next);
  }
};
