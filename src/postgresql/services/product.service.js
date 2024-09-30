export class ProductService {
  constructor(productDB) {
    this.db = productDB;
  }

  getPaginatedProducts = async ({ orderBy, page, pageSize, keyword }) => {
    const totalCount = await this.db.count(keyword);

    const list = await this.db.findMany({
      orderBy,
      page,
      pageSize,
      keyword,
    });

    return { totalCount, list };
  };

  getProduct = async (id) => {
    const product = await this.db.findById(id);

    return product;
  };

  postProduct = async (body) => {
    const product = await this.db.create(body);

    return product;
  };

  patchProduct = async (id, body) => {
    const product = await this.db.findById(id);
    if (!product) return;

    Object.keys(body).forEach((k) => {
      product[k] = body[k];
    });

    const updated = await this.db.update(id, product);

    return updated;
  };

  deleteProduct = async (id) => {
    const product = await this.db.deleteById(id);

    return product;
  };
}
