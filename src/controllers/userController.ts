import { Request, Response } from "express";
import { asyncErrorHandler } from "../middlewares/errorHandler";
import { UserService } from "../services/userService";

export class UserController {
  constructor(private service: UserService) {}

  createUser = asyncErrorHandler(
    async (req: Request, res: Response): Promise<any> => {
      const user = await this.service.createUser(req.body);
      res.send(user);
    }
  );
}
