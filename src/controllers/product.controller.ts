import { assert } from 'superstruct';
import { ProductService } from '#services/product.service.js';
import { ProductDTO } from '#types/dtos.type.js';
import { FindOptions } from '#types/options.type.js';
import { RequestHandler } from '#types/request.type.js';
import HTTP_CODES from '#utils/constants/http-codes.js';
import MESSAGES from '#utils/constants/messages.js';
import { Uuid } from '#utils/struct.js';

export class ProductController {
  constructor(private readonly productService: ProductService) {}

  getProducts: RequestHandler<{ query: FindOptions }> = async (req, res) => {
    const orderBy = req.query.orderBy || 'recent';
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;
    const keyword = req.query.keyword || '';

    const resBody = await this.productService.getPaginatedProducts({
      orderBy,
      page,
      pageSize,
      keyword,
    });

    res.json(resBody);
  };

  getProductById: RequestHandler<{ params: { id: string } }> = async (req, res) => {
    assert(req.params.id, Uuid);
    const id = req.params.id;

    const product = await this.productService.getProduct(id);

    res.json(product);
  };

  postProduct: RequestHandler<{ body: ProductDTO }> = async (req, res) => {
    const product = await this.productService.postProduct(req.body);

    res.status(HTTP_CODES.CREATED).json(product);
  };

  patchProduct: RequestHandler<{
    params: { id: string };
    body: ProductDTO;
  }> = async (req, res) => {
    assert(req.params.id, Uuid, MESSAGES.IDFORMAT);
    const id = req.params.id;

    const product = await this.productService.patchProduct(id, req.body);

    res.json(product);
  };

  deleteProduct: RequestHandler<{ params: { id: string } }> = async (req, res) => {
    assert(req.params.id, Uuid, MESSAGES.IDFORMAT);
    const id = req.params.id;

    const product = await this.productService.deleteProduct(id);

    res.json(product);
  };

  postProductLike: RequestHandler<{ params: { id: string } }> = async (req, res) => {
    assert(req.params.id, Uuid, MESSAGES.IDFORMAT);
    const productId = req.params.id;
    const { userId } = req.user!;
    const product = await this.productService.postProductLike(productId, userId);

    res.json(product);
  };

  deleteProductLike: RequestHandler<{ params: { id: string } }> = async (req, res) => {
    assert(req.params.id, Uuid, MESSAGES.IDFORMAT);
    const productId = req.params.id;
    const { userId } = req.user!;
    const product = await this.productService.deleteProductLike(productId, userId);

    res.json(product);
  };
}
