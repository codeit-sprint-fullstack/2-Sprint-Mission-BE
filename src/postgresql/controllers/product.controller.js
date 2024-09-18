import { assert } from 'superstruct';
import { TypeError } from '../utils/error.js';
import { CreateProduct, PatchProduct, Uuid } from '../../struct.js';
import { MESSAGES } from '../../constants.js';

export class ProductController {
  constructor(productService) {
    this.service = productService;
  }

  getProducts = async (req, res) => {
    const orderBy = req.query.orderBy || 'recent';
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;
    const keyword = req.query.keyword || '';

    if (isNaN(page) || isNaN(pageSize)) {
      throw new TypeError('page and pageSize should be an integer');
    }

    res.status(200).json(
      await this.service.getProductsAndCount({
        orderBy,
        page,
        pageSize,
        keyword,
      })
    );
  };

  getProductById = async (req, res) => {
    assert(req.params.id, Uuid);
    const id = req.params.id;

    const product = await this.service.getProductById(id);

    if (product) res.json(product);
    else res.status(404).json({ message: MESSAGES.NOID });
  };

  postProduct = async (req, res) => {
    assert(req.body, CreateProduct);
    const newProduct = await this.service.postProduct(req.body);

    res.status(201).json(newProduct);
  };

  patchProductById = async (req, res) => {
    assert(req.params.id, Uuid, MESSAGES.IDFORMAT);
    assert(req.body, PatchProduct);
    const id = req.params.id;

    const product = await this.service.patchProductById(id, req.body);

    if (product) res.json(product);
    else res.status(404).json({ message: MESSAGES.NOID });
  };

  deleteProductById = async (req, res) => {
    assert(req.params.id, Uuid, MESSAGES.IDFORMAT);
    const id = req.params.id;

    const product = await this.service.deleteProductById(id);

    if (product) res.status(200).json(product);
    else res.status(404).json({ message: MESSAGES.NOID });
  };
}
