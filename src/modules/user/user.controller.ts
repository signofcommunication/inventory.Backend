import { Request, Response } from "express";
import { UserService } from "./user.service";
import { successResponse, errorResponse } from "../../shared/apiResponse";
import { AuthRequest } from "../../middlewares/auth.middleware";

const userService = new UserService();

export class UserController {
  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await userService.getAllUsers();
      res.json(successResponse(users, "Users retrieved successfully"));
    } catch (error: any) {
      res.status(500).json(errorResponse(error.message));
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const user = await userService.getUserById(id);
      if (!user) {
        return res.status(404).json(errorResponse("User not found"));
      }
      res.json(successResponse(user, "User retrieved successfully"));
    } catch (error: any) {
      res.status(500).json(errorResponse(error.message));
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json(successResponse(user, "User created successfully"));
    } catch (error: any) {
      res.status(400).json(errorResponse(error.message));
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const currentUserId = (req as AuthRequest).user!.id;
      const user = await userService.updateUser(id, req.body, currentUserId);
      if (!user) {
        return res.status(404).json(errorResponse("User not found"));
      }
      res.json(successResponse(user, "User updated successfully"));
    } catch (error: any) {
      res.status(400).json(errorResponse(error.message));
    }
  }

  async updateUserStatus(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const { isActive } = req.body;
      if (typeof isActive !== "boolean") {
        return res
          .status(400)
          .json(errorResponse("isActive must be a boolean"));
      }
      const currentUserId = (req as AuthRequest).user!.id;
      const user = await userService.updateUserStatus(
        id,
        isActive,
        currentUserId
      );
      if (!user) {
        return res.status(404).json(errorResponse("User not found"));
      }
      res.json(
        successResponse(
          user,
          `User ${isActive ? "activated" : "deactivated"} successfully`
        )
      );
    } catch (error: any) {
      res.status(400).json(errorResponse(error.message));
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const currentUserId = (req as AuthRequest).user!.id;
      const user = await userService.deleteUser(id, currentUserId);
      if (!user) {
        return res.status(404).json(errorResponse("User not found"));
      }
      res.json(successResponse(user, "User deleted successfully"));
    } catch (error: any) {
      res.status(400).json(errorResponse(error.message));
    }
  }
}
