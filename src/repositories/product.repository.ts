import { Prisma, PrismaClient } from '@prisma/client';
import { OrderByCondition, WhereCondition } from '#types/conditions.type.js';
import { ProductDTO } from '#types/dtos.type.js';
import { FindOptions } from '#types/options.type.js';

export class ProductRepository {
  private readonly product;
  private readonly productTag;
  private readonly productImage;
  constructor(private readonly prismaClient: PrismaClient) {
    this.product = prismaClient.product;
    this.productTag = prismaClient.productTag;
    this.productImage = prismaClient.productImage;
  }

  count = async (keyword: string) => {
    const searchOption: WhereCondition = keyword
      ? {
          where: {
            OR: [{ name: { contains: keyword } }, { description: { contains: keyword } }],
          },
        }
      : {};

    const count = await this.product.count(searchOption);

    return count;
  };

  findMany = async ({ orderBy, page, pageSize, keyword }: FindOptions) => {
    let sortOption: OrderByCondition;
    switch (orderBy) {
      case 'like':
        sortOption = { orderBy: { likeCount: Prisma.SortOrder.desc } };
        break;
      case 'recent':
      default:
        sortOption = { orderBy: { createdAt: Prisma.SortOrder.desc } };
    }

    const searchOption: WhereCondition = keyword
      ? {
          where: {
            OR: [{ name: { contains: keyword } }, { description: { contains: keyword } }],
          },
        }
      : {};

    const products = await this.product.findMany({
      ...searchOption,
      ...sortOption,
      take: pageSize,
      skip: (page - 1) * pageSize,
    });

    return products;
  };

  findById = async (id: string) => {
    const product = await this.product.findUnique({
      where: { id },
      include: {
        productTags: { select: { tag: true } },
        owner: { select: { nickname: true } },
        likeUsers: { select: { id: true } },
        comments: true,
      },
    });

    return product;
  };

  create = async (body: ProductDTO) => {
    const { tags, file, ...data } = body;
    const product = await this.product.create({ data });
    const newTags = tags.map(tag => ({ tag, productId: product.id }));
    await this.productTag.createMany({
      data: newTags,
      skipDuplicates: true,
    });
    const fileData = { originalName: file.originalname, fileName: file.filename, productId: product.id };
    const image = await this.productImage.create({ data: fileData });

    return { product, image };
  };

  update = async (id: string, body: ProductDTO) => {
    const { tags, file, ...data } = body;
    const fileData = { originalName: file.originalname, fileName: file.filename, productId: id };

    const product = await this.product.update({
      where: { id },
      data: {
        ...data,
        productTags: {
          deleteMany: {},
          create: tags.map(tag => ({ tag, productId: id })),
        },
        productImages: {
          deleteMany: {},
          create: fileData,
        },
      },
    });

    return product;
  };

  deleteById = async (id: string) => {
    const product = await this.product.delete({ where: { id } });

    return product;
  };

  like = async (productId: string, userId: string) => {
    const product = await this.product.update({
      where: { id: productId },
      data: {
        likeUsers: { connect: { id: userId } },
        likeCount: { increment: 1 },
      },
    });

    return product;
  };

  unlike = async (productId: string, userId: string) => {
    const product = await this.product.update({
      where: { id: productId },
      data: {
        likeUsers: { disconnect: { id: userId } },
        likeCount: { decrement: 1 },
      },
    });

    return product;
  };
}
