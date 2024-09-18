export class ProductService {
  constructor(productModel) {
    this.model = productModel;
  }

  getProductsAndCount = async ({ orderBy, page, pageSize, keyword }) => {
    const totalCount = await this.model.count(keyword);

    const list = await this.model.findMany({
      orderBy,
      page,
      pageSize,
      keyword,
    });

    return { totalCount, list };
  };

  getProductById = async (id) => {
    return await this.model.findById(id);
  };

  postProduct = async (body) => {
    return await this.model.create(body);
  };

  patchProductById = async (id, body) => {
    let product = await this.model.findById(id);
    if (!product) return;

    Object.keys(body).forEach((k) => {
      product[k] = body[k];
    });
    return await this.model.update(id, product);
  };

  deleteProductById = async (id) => {
    return await this.model.deleteById(id);
  };
}
