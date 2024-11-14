import { Request, Response } from "express";
import { asyncErrorHandler } from "../middlewares/errorHandler";
import { UserService } from "../services/userService";

export class UserController {
  constructor(private service: UserService) {}

  createUser = asyncErrorHandler(
    async (req: Request, res: Response): Promise<any> => {
      const user = await this.service.createUser(req.body);
      res.json(user);
    }
  );

  loginUser = asyncErrorHandler(
    async (req: Request, res: Response): Promise<any> => {
      const { email, password } = req.body;
      const user = await this.service.getUser(email, password);
      return res.json(user);
    }
  );
}
