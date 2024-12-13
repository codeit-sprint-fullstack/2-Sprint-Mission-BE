import { User } from '@prisma/client';
import { UserRepository } from '#repositories/user.repository.js';
import { FindOptions } from '#types/options.type.js';
import assertExist from '#utils/assertExist.js';

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  getPaginatedUsers = async ({ orderBy, page, pageSize, keyword }: FindOptions) => {
    const totalCount = await this.userRepository.count(keyword);

    const list = await this.userRepository.findMany({
      orderBy,
      page,
      pageSize,
      keyword,
    });

    return { totalCount, list };
  };

  getUserById = async (id: string): Promise<User | null> => {
    const user = await this.userRepository.findById(id);
    assertExist(user);

    return user;
  };
}
