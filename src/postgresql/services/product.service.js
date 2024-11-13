export class ProductService {
  constructor(productRepo) {
    this.repo = productRepo;
  }

  getPaginatedProducts = async ({ orderBy, page, pageSize, keyword }) => {
    const totalCount = await this.repo.count(keyword);

    const list = await this.repo.findMany({
      orderBy,
      page,
      pageSize,
      keyword,
    });

    return { totalCount, list };
  };

  getProduct = async id => {
    const product = await this.repo.findById(id);

    return product;
  };

  postProduct = async body => {
    const product = await this.repo.create(body);

    return product;
  };

  patchProduct = async (id, body) => {
    const product = await this.repo.findById(id);
    if (!product) return;

    Object.keys(body).forEach(k => {
      product[k] = body[k];
    });

    const updated = await this.repo.update(id, product);

    return updated;
  };

  deleteProduct = async id => {
    const product = await this.repo.deleteById(id);

    return product;
  };
}
