import { Request, Response } from "express";
import { asyncErrorHandler } from "../middlewares/errorHandler";
import { UserService } from "../services/userService";
import { AuthRequest } from "../types/requestType";

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
      const accessToken = this.service.createToken(user.id);
      const refreshToken = this.service.createToken(user.id, "refresh");
      await this.service.updateUser(user.id, { refreshToken });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: false,
      });
      return res.json({ accessToken });
    }
  );

  refreshAccessToken = asyncErrorHandler(
    async (req: AuthRequest, res: Response): Promise<any> => {
      if (!req.auth || !req.auth.userId) {
        return res
          .status(401)
          .json({ error: "Unauthorized: Missing or invalid user ID" });
      }
      const { refreshToken } = req.cookies;
      const { userId } = req.auth;
      const accessToken = await this.service.refreshToken(userId, refreshToken);
      return res.json({ accessToken });
    }
  );
}
