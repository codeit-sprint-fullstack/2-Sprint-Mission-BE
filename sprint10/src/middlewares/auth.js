import userRepository from '../repositories/userRepository.js';
import { expressjwt } from 'express-jwt';
import reviewRepository from '../repositories/reviewRepository.js';
import productCommentRepository from '../repositories/productCommentRepository.js';
import productRepository from '../repositories/productRepository.js';
import articleCommentRepository from '../repositories/articleCommentRepository.js';
import articleRepository from '../repositories/articleRepository.js';

// function throwUnauthorizedError() {
//   // 인증되지 않은 경우 401 에러를 발생시키는 함수
//   const error = new Error('Unauthorized');
//   error.code = 401;
//   throw error;
// }

const verifyAccessToken = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
  requestProperty: 'user'
});

const verifyRefreshToken = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
  getToken: (req) => req.cookies.refreshToken,
});

async function verifyReviewAuth(req, res, next) {
  const { id: reviewId } = req.params;
  try {
    const review = await reviewRepository.getById(reviewId);

    if (!review) {
      const error = new Error('Review not found');
      error.code = 404;
      throw error;
    }

    if (review.authorId !== req.user.id) {
      const error = new Error('Forbidden');
      error.code = 403;
      throw error;
    }

    return next();
  } catch (error) {
    return next(error);
  }
}

async function verifyProductCommentAuth(req, res, next) {
  const { commentId } = req.params;
  try {
    const comment = await productCommentRepository.getById(commentId);

    if (!comment) {
      const error = new Error('Product-Comment not found');
      error.code = 404;
      throw error;
    }

    if (comment.commenterId !== req.user.id) {
      const error = new Error('Forbidden');
      error.code = 403;
      throw error;
    }

    return next();
  } catch (error) {
    return next(error);
  }
}

async function verifyProductAuth(req, res, next) {
  const { productId } = req.params;
  try {
    const product = await productRepository.getById(productId);

    if (!product) {
      const error = new Error('Product not found');
      error.code = 404;
      throw error;
    }

    if (product.ownerId !== req.user.id) {
      const error = new Error('Forbidden');
      error.code = 403;
      throw error;
    }

    return next();
  } catch (error) {
    return next(error);
  }
}

async function verifyArticleCommentAuth(req, res, next) {
  const { commentId } = req.params;
  try {
    const comment = await articleCommentRepository.getById(commentId);

    if (!comment) {
      const error = new Error('Article-Comment not found');
      error.code = 404;
      throw error;
    }

    if (comment.commenter.id !== req.user.id) {
      const error = new Error('Forbidden');
      error.code = 403;
      throw error;
    }

    return next();
  } catch (error) {
    return next(error);
  }
}

async function verifyArticleAuth(req, res, next) {
  const { articleId } = req.params;
  try {
    const article = await articleRepository.getById(articleId);

    if (!article) {
      const error = new Error('Article not found');
      error.code = 404;
      throw error;
    }

    if (article.authorId !== req.user.id) {
      const error = new Error('Forbidden');
      error.code = 403;
      throw error;
    }

    return next();
  } catch (error) {
    return next(error);
  }
}

// async function verifySessionLogin(req, res, next) {
//   // 세션에서 사용자 정보를 읽어옴
//   try {
//     const { userId } = req.session;

//     if (!userId) {
//       // 로그인되어있지 않으면 인증 실패
//       throwUnauthorizedError();
//     }

//     const user = await userRepository.findById(req.session.userId);

//     if (!user) {
//       throwUnauthorizedError();
//     }

//     // 이후 편리성을 위한 유저 정보 전달
//     req.user = {
//       id: req.session.userId,
//       email: user.email,
//       name: user.name,
//       provider: user.provider,
//       providerId: user.providerId,
//     };
//     // 사용자가 로그인되어 있다면 다음 미들웨어 처리
//     next();
//   } catch (error) {
//     next(error);
//   }
// }

// function passportAuthenticateSession(req, res, next) {
//   if (!req.isAuthenticated()) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }
//   return next();
// }

export default {
  verifyAccessToken,
  verifyRefreshToken,
  verifyReviewAuth,
  verifyProductCommentAuth,
  verifyProductAuth,
  verifyArticleCommentAuth,
  verifyArticleAuth,
}

