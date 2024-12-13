import { Prisma, PrismaClient } from '@prisma/client';
import { WhereCondition } from '#types/conditions.type.js';
import { UserDTO } from '#types/dtos.type.js';
import { FindOptions } from '#types/options.type.js';

export class UserRepository {
  private readonly user;
  constructor(private readonly prismaClient: PrismaClient) {
    this.user = prismaClient.user;
  }

  count = async (keyword: string) => {
    const searchOption: WhereCondition = keyword ? { where: { nickname: { contains: keyword } } } : {};

    const count = await this.user.count(searchOption);

    return count;
  };

  findMany = async ({ orderBy, page, pageSize, keyword }: FindOptions) => {
    let sortOption;
    switch (orderBy) {
      case 'recent':
      default:
        sortOption = { orderBy: { createdAt: Prisma.SortOrder.desc } };
    }

    const searchOption: WhereCondition = keyword ? { where: { nickname: { contains: keyword } } } : {};

    const users = await this.user.findMany({
      ...searchOption,
      ...sortOption,
      take: pageSize,
      skip: page,
    });

    return users;
  };

  findById = async (id: string) => {
    const user = await this.user.findUnique({
      where: { id },
    });

    return user;
  };

  findByEmail = async (email: string) => {
    const user = await this.user.findUnique({
      where: { email },
    });

    return user;
  };

  findBySignInForm = async (body: UserDTO) => {
    const { email, password } = body;
    const user = await this.user.findFirst({
      where: { email, password },
    });

    return user;
  };

  create = async (data: UserDTO) => {
    const user = await this.user.create({ data });

    return user;
  };

  update = async (id: string, data: UserDTO) => {
    const user = await this.user.update({ where: { id }, data });

    return user;
  };
}
