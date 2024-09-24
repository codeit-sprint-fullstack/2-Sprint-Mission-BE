import prisma from '../models/productModel.js';
import { Prisma } from '@prisma/client';
import { assert } from 'superstruct';
import { CreateProduct, PatchProduct } from '../structs.js';
import { AppError } from '../utils/errorHandler.js';

// 상품 등록
export const createProduct = async (req, res, next) => {
  try {
    assert(req.body, CreateProduct);
    const newProduct = await prisma.product.create({
      data: req.body
    });
    res.locals.data = newProduct;
    res.status(201).json(newProduct);
  } catch (err) {
    handleError(err, next);
  }
};

// 상품 상세 조회
export const getProductById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await prisma.product.findUniqueOrThrow({
      where: { id }
    });
    const { updatedAt, ...filteredProduct } = product;
    res.locals.data = filteredProduct;
    res.json(filteredProduct);
  } catch (err) {
    handleError(err, next);
  }
};

// 상품 수정
export const updateProduct = async (req, res, next) => {
  try {
    assert(req.body, PatchProduct);
    const id = req.params.id;
    const product = await prisma.product.update({
      where: { id },
      data: req.body
    });
    res.locals.data = product;
    res.json(product);
  } catch (err) {
    handleError(err, next);
  }
};

// 상품 삭제
export const deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    await prisma.product.delete({
      where: { id }
    });
    res.sendStatus(204);
  } catch (err) {
    handleError(err, next);
  }
};

// 상품 목록 조회
export const getProducts = async (req, res, next) => {
  try {
    const {
      page = 1,
      pageSize = 10,
      order = 'recent',
      keyword = ''
    } = req.query;

    const offset = (page - 1) * pageSize;

    const products = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: keyword } },
          { description: { contains: keyword } }
        ]
      },
      select: {
        id: true,
        name: true,
        price: true,
        createdAt: true
      },
      orderBy: order === 'recent' ? { createdAt: 'desc' } : {},
      skip: offset,
      take: parseInt(pageSize)
    });
    res.locals.data = products;
    res.json(products);
  } catch (err) {
    handleError(err, next);
  }
};

const handleError = (err, next) => {
  if (err.name === 'StructError') {
    return next(new AppError(400, err.message));
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    return next(new AppError(404, 'Product not found'));
  }
  return next(new AppError(500, 'Internal Server Error'));
};
