import express from 'express';

import articleService from '../services/articleService.js';
import articleCommentService from '../services/articleCommentService.js';
import auth from '../middlewares/auth.js';
import passport from '../config/passport.js';
import { CreateArticle, CreateArticleComment } from '../structs.js';
import HttpStatus from '../httpStatus.js';
import { assert } from 'superstruct';
import multer from 'multer';

const articleController = express.Router();

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/');
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}-${file.originalname}`);
	},
});
const upload = multer({ storage: storage });

articleController.post("/",
passport.authenticate('access-token', { session: false }),
upload.array('images', 3),
async (req, res, next) => {
	try {
		const { id: userId } = req.user;
		const data = {
			...req.body,
			authorId: userId,
			images: req.files.map((file) => `/uploads/${file.filename}`),
		};
		// assert(data, CreateArticle);
		data.favoriteCount = 0;
		const article = await articleService.create(data);
		res.send(article);
	} catch (err) {
		next(err);
	}
});

articleController.post("/:articleId/comments",
passport.authenticate('access-token', { session: false }),
async (req, res, next) => {
	try {
		req.body.commenterId = req.user.id;
		assert(req.body, CreateArticleComment);
		const { articleId } = req.params;
		const articleComment = await articleCommentService.create(articleId, req.user.id, req.body.content);
		res.send(articleComment);
	} catch (err) {
		next(err);
	}
});

articleController.patch("/:articleId/comments/:commentId",
passport.authenticate('access-token', { session: false }),
auth.verifyArticleCommentAuth,
async (req, res, next) => {
	try {
		req.body.commenterId = req.user.id;
		assert(req.body, CreateArticleComment);
		const { articleId, commentId } = req.params;
		const articleComment = await articleCommentService.updateById(commentId, {
				...req.body,
				articleId,
			});
		res.send(articleComment);
	} catch (err) {
		next(err);
	}
});

articleController.delete("/:articleId/comments/:commentId",
passport.authenticate('access-token', { session: false }),
auth.verifyArticleCommentAuth,
async (req, res, next) => {
	try {
		const { commentId } = req.params;
		const articleComment = await articleCommentService.deleteById(commentId);
		res.status(HttpStatus.NO_CONTENT).send(articleComment);
	} catch (err) {
		next(err);
	}
});

articleController.patch("/:articleId",
passport.authenticate('access-token', { session: false }),
auth.verifyArticleAuth,
async (req, res, next) => {
	try {
		assert(req.body, PatchArticle);
		const { articleId } = req.params;
		const article = await articleService.updateById(articleId, req.body);
		res.send(article);
	} catch (err) {
		next(err);
	}
});

articleController.get("/",
async (req, res, next) => {
	try {
		const result = await articleService.getArticles(req.query);
		res.send(result);
	} catch (err) {
		next(err);
	}
});

articleController.get("/:articleId",
passport.authenticate('access-token', { session: false }),
async (req, res, next) => {
	try {
		const { articleId } = req.params;
		const article = await articleService.getById(articleId, req.user.id);
		if (!article) {
			return res.status(HttpStatus.NOT_FOUND).send();
		}
		res.send(article);
	} catch (err) {
		next(err);
	}
});

articleController.get("/:articleId/comments", async (req, res, next) => {
	try {
		const { articleId } = req.params;
		const articleComments = await articleCommentService.findManyComments(articleId);
		if (!articleComments) {
			return res.status(HttpStatus.NOT_FOUND).send();
		}
		res.send(articleComments);
	} catch (err) {
		next(err);
	}
});

articleController.delete("/:articleId",
passport.authenticate('access-token', { session: false }),
auth.verifyArticleAuth,
async (req, res, next) => {
	try {
		const { articleId } = req.params;
		const article = await articleService.deleteArticle(articleId);
		res.status(HttpStatus.NO_CONTENT).send(article);
	} catch (err) {
		next(err);
	}
});

articleController.post("/:articleId/favorite",
passport.authenticate('access-token', { session: false }),
async (req, res, next) => {
  try {
		const { articleId } = req.params;
		  const { id: userId } = req.user;
		  const [favorite] = await articleService.favorite(articleId, userId);
		  res.send(favorite);
	} catch (err) {
		next(err);
	}
});

articleController.delete("/:articleId/favorite",
passport.authenticate('access-token', { session: false }),
async (req, res, next) => {
  try {
		const { articleId } = req.params;
		  const { id: userId } = req.user;
		  const [favorite] = await articleService.unfavorite(articleId, userId);
			if (!favorite) {
				return res.status(HttpStatus.NO_CONTENT).send();
			}
		  res.send(favorite);
	} catch (err) {
		next(err);
	}
});

export default articleController;
