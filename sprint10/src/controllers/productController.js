import express from 'express';

import productService from '../services/productService.js';
import productCommentService from '../services/productCommentService.js';
import { CreateProduct, CreateProductComment, PatchProduct } from '../structs.js';
import { assert, create } from "superstruct";
import auth from '../middlewares/auth.js';
import passport from '../config/passport.js';
import HttpStatus from '../httpStatus.js';

const productController = express.Router();

productController.post('/',
passport.authenticate('access-token', { session: false }),
async (req, res, next) => {
	try {
		req.body.ownerId = req.user.id;
		assert(req.body, CreateProduct);
		req.body.favoriteCount = 0;
		const createdProduct = await productService.create(req.body);
		return res.json(createdProduct);
	} catch (err) {
		next(err);
	}
});

productController.get('/:productId',
passport.authenticate('access-token', { session: false }),
async (req, res, next) => {
  try {
		const { productId } = req.params;
		  const product = await productService.getById(productId, req.user.id);
		  return res.json(product);
	} catch (err) {
		next(err);
	}
});

productController.get('/:productId/comments',
async (req, res, next) => {
  try {
		const { productId } = req.params;
		  const products = await productCommentService.findManyComments(productId);
		  return res.json(products);
	} catch (err) {
		next(err);
	}
});

productController.post("/:productId/comments",
passport.authenticate('access-token', { session: false }),
async (req, res, next) => {
	try {
		req.body.commenterId = req.user.id;
		assert(req.body, CreateProductComment);
		const { productId } = req.params;
		const productComment = await productCommentService.create({
				...req.body,
				productId,
			});
		res.status(HttpStatus.CREATED).send(productComment);
	} catch (err) {
		next(err);
	}
});

productController.patch("/:productId/comments/:commentId",
passport.authenticate('access-token', { session: false }),
auth.verifyProductCommentAuth,
async (req, res, next) => {
	try {
		const { productId, commentId } = req.params;
		req.body.commenterId = req.user.id;
		assert(req.body, CreateProductComment);
		const productComment = await productCommentService.update(commentId, req.body);
		res.send(productComment);
	} catch (err) {
		next(err);
	}
});

productController.delete("/:productId/comments/:commentId",
passport.authenticate('access-token', { session: false }),
auth.verifyProductCommentAuth,
async (req, res, next) => {
	try {
		const { commentId } = req.params;
		const productComment = await productCommentService.deleteById(commentId);
		res.status(HttpStatus.NO_CONTENT).send(productComment);
	} catch (err) {
		next(err);
	}
});

productController.patch("/:productId",
passport.authenticate('access-token', { session: false }),
auth.verifyProductAuth,
async (req, res, next) => {
	try {
		assert(req.body, PatchProduct);
		const { productId } = req.params;
		const product = await productService.updateById(productId, req.body);
		res.send(product);
	} catch (err) {
		next(err);
	}
});

productController.get("/",
async (req, res, next) => {
	try {
		const result = await productService.getProducts(req.query);
		res.send(result);
	} catch (err) {
		next(err);
	}
});

productController.get("/:productId",
passport.authenticate('access-token', { session: false }),
async (req, res, next) => {
	try {
		const { productId } = req.params;
		const product = await productService.getById(productId, req.user.id);
		res.send(product);
	} catch (err) {
		next(err);
	}
});

productController.delete("/:productId",
passport.authenticate('access-token', { session: false }),
auth.verifyProductAuth,
async (req, res, next) => {
	try {
		const { productId } = req.params;
		const product = await productService.deleteById(productId);
		res.status(HttpStatus.NO_CONTENT).send(product);
	} catch (err) {
		next(err);
	}
});

productController.post('/:productId/favorite',
passport.authenticate('access-token', { session: false }),
async (req, res, next) => {
  try {
		const { productId } = req.params;
		const userId = req.user.id;
		const [favorite] = await productService.favorite(productId, userId);
		res.status(HttpStatus.CREATED).send(favorite);
	} catch (err) {
		next(err);
	}
});

productController.delete('/:productId/favorite',
passport.authenticate('access-token', { session: false }),
async (req, res, next) => {
  try {
		const { productId } = req.params;
		  const userId = req.user.id;
		  const [favorite] = await productService.unfavorite(productId, userId);
		  res.status(HttpStatus.NO_CONTENT).send(favorite);
	} catch (err) {
		next(err);
	}
});

export default productController;
