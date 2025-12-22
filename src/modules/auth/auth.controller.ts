import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { successResponse, errorResponse } from "../../shared/apiResponse";

const authService = new AuthService();

export class AuthController {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      res.json(successResponse(result, "Login successful"));
    } catch (error: any) {
      res.status(401).json(errorResponse(error.message));
    }
  }
}
