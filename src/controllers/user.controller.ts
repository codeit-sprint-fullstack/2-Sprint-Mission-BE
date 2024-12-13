import { UserService } from '#services/user.service.js';
import { FindOptions } from '#types/options.type.js';
import { RequestHandler } from '#types/request.type.js';

export class UserController {
  constructor(private readonly userService: UserService) {}

  getUsersDev: RequestHandler<{ query: FindOptions }> = async (req, res) => {
    const orderBy = req.query.orderBy || 'recent';
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;
    const keyword = req.query.keyword || '';

    const resBody = await this.userService.getPaginatedUsers({
      orderBy,
      page,
      pageSize,
      keyword,
    });

    res.json(resBody);
  };
}
