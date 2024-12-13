import { ProductRepository } from '#repositories/product.repository.js';
import { ProductDTO } from '#types/dtos.type.js';
import { FindOptions } from '#types/options.type.js';
import assertExist from '#utils/assertExist.js';

export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  getPaginatedProducts = async ({ orderBy, page, pageSize, keyword }: FindOptions) => {
    const totalCount = await this.productRepository.count(keyword);

    const list = await this.productRepository.findMany({
      orderBy,
      page,
      pageSize,
      keyword,
    });

    return { totalCount, list };
  };

  getProduct = async (id: string) => {
    const product = await this.productRepository.findById(id);
    assertExist(product);

    const tags = product.productTags.map(tagObj => tagObj.tag);
    const { productTags, owner, ...filtered } = product;
    const result = { ...filtered, tags, ownerNickname: owner?.nickname };

    return result;
  };

  postProduct = async (body: ProductDTO) => {
    const { product, image } = await this.productRepository.create(body);
    const imageUrl = `/files/${image.fileName}`;

    return { product, imageUrl };
  };

  patchProduct = async (id: string, body: ProductDTO) => {
    const target = await this.productRepository.findById(id);
    assertExist(target);

    const product = await this.productRepository.update(id, body);

    return product;
  };

  deleteProduct = async (id: string) => {
    const target = await this.productRepository.findById(id);
    assertExist(target);

    const product = await this.productRepository.deleteById(id);

    return product;
  };

  postProductLike = async (productId: string, userId: string) => {
    const target = await this.productRepository.findById(productId);
    assertExist(target);

    const product = await this.productRepository.like(productId, userId);

    return { product, isLiked: true };
  };

  deleteProductLike = async (productId: string, userId: string) => {
    const target = await this.productRepository.findById(productId);
    assertExist(target);

    const product = await this.productRepository.unlike(productId, userId);

    return { product, isLiked: false };
  };
}
