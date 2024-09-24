import prisma from '../models/productModel.js';
import { assert } from 'superstruct';
import { CreateProduct, PatchProduct } from '../structs.js';
import { handleError } from '../utils/handleError.js';

// 상품 등록
export const createProduct = async (req, res, next) => {
  try {
    assert(req.body, CreateProduct);
    const { name, description, price, tags } = req.body;
    const newProduct = await prisma.product.create({
      data: { name, description, price, tags }
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
    const { id } = req.params;
    const product = await prisma.product.findUniqueOrThrow({
      where: { id },
      include: {
        productComments: {
          select: {
            content: true,
            createdAt: true,
            ownerUserId: true
          }
        }
      }
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
    const { id } = req.params;
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
    const { id } = req.params;
    await prisma.product.delete({
      where: { id }
    });
    res.status(204).json();
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
