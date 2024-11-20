import express from 'express';

import reviewService from '../services/reviewService.js';
import auth from '../middlewares/auth.js';
import passport from '../config/passport.js';

const reviewController = express.Router();

reviewController.post('/', 
  // auth.verifyAccessToken, 
  passport.authenticate('access-token', { session: false }),
  async (req, res, next) => {
  console.log(req.user);
  const { id: userId } = req.user; // req.user.userId
  try {
    const createdReview = await reviewService.create({
      ...req.body,
      authorId: userId,
    });
    return res.status(201).json(createdReview);
  } catch (error) {
    return next(error);
  }
});

reviewController.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const review = await reviewService.getById(id);
    return res.json(review);
  } catch (error) {
    return next(error);
  }
});

reviewController.get('/', async (req, res, next) => {
  try {
    const reviews = await reviewService.getAll();
    return res.json(reviews);
  } catch (error) {
    return next(error);
  }
});

reviewController.put('/:id', 
  // auth.verifyAccessToken, 
  passport.authenticate('access-token', { session: false }),
  auth.verifyReviewAuth, 
  async (req, res, next) => {
  try {
    const updatedReview = await reviewService.update(
      req.params.id,
      req.body,
    );
    return res.json(updatedReview);
  } catch (error) {
    return next(error);
  }
});

reviewController.delete('/:id', 
  // auth.verifyAccessToken, 
  passport.authenticate('access-token', { session: false }),
  auth.verifyReviewAuth, 
  async (req, res, next) => {
  try {
    const deletedReview = await reviewService.deleteById(req.params.id);
    return res.status(204).json(deletedReview);
  } catch (error) {
    return next(error);
  }
});

export default reviewController;
