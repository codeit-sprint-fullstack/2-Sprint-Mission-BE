import { assert } from 'superstruct';
import { CreateProduct, PatchProduct, Uuid } from '../../struct.js';
import { MESSAGES } from '../../constants.js';
import { TypeError } from '../../error.js';

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

    const resBody = await this.service.getPaginatedProducts({
      orderBy,
      page,
      pageSize,
      keyword,
    });

    res.json(resBody);
  };

  getProductById = async (req, res) => {
    assert(req.params.id, Uuid);
    const id = req.params.id;

    const product = await this.service.getProduct(id);

    if (!product) res.status(404).json({ message: MESSAGES.NOID });

    res.json(product);
  };

  postProduct = async (req, res) => {
    assert(req.body, CreateProduct);

    const product = await this.service.postProduct(req.body);

    res.status(201).json(product);
  };

  patchProductById = async (req, res) => {
    assert(req.params.id, Uuid, MESSAGES.IDFORMAT);
    assert(req.body, PatchProduct);
    const id = req.params.id;

    const product = await this.service.patchProduct(id, req.body);

    if (!product) res.status(404).json({ message: MESSAGES.NOID });

    res.json(product);
  };

  deleteProductById = async (req, res) => {
    assert(req.params.id, Uuid, MESSAGES.IDFORMAT);
    const id = req.params.id;

    const product = await this.service.deleteProduct(id);

    if (!product) res.status(404).json({ message: MESSAGES.NOID });

    res.json(product);
  };
}
