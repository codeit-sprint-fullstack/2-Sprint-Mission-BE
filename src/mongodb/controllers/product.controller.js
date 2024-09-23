import { assert } from 'superstruct';
import { MESSAGES } from '../../constants.js';
import { MongodbId } from '../../struct.js';
import { TypeError } from '../../error.js';

export class ProductController {
  constructor(productService) {
    this.productService = productService;
  }

  getProducts = async (req, res) => {
    const orderBy = req.query.orderBy || 'recent';
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;
    const keyword = req.query.keyword || '';

    if (isNaN(page) || isNaN(pageSize)) {
      throw new TypeError('page and pageSize should be an integer');
    }

    res.json(
      await this.productService.getProductsAndCount({
        orderBy,
        page,
        pageSize,
        keyword,
      })
    );
  };

  getProductById = async (req, res) => {
    assert(req.params.id, MongodbId, MESSAGES.IDFORMAT);
    const id = req.params.id;

    const product = await this.productService.getProductById(id);

    if (!product) res.status(404).json({ message: MESSAGES.NOID });

    res.json(product);
  };

  postProduct = async (req, res) => {
    const newProduct = await this.productService.postProduct(req.body);

    res.status(201).json(newProduct);
  };

  patchProductById = async (req, res) => {
    assert(req.params.id, MongodbId, MESSAGES.IDFORMAT);
    const id = req.params.id;

    const product = await this.productService.patchProductById(id, req.body);

    if (!product) res.status(404).json({ message: MESSAGES.NOID });

    res.json(product);
  };

  deleteProductById = async (req, res) => {
    assert(req.params.id, MongodbId, MESSAGES.IDFORMAT);
    const id = req.params.id;

    const product = await this.productService.deleteProductById(id);

    if (!product) res.status(404).json({ message: MESSAGES.NOID });

    // res.json(product);
    res.sendStatus(204);
  };
}
