import { Request, Response } from "express";
import { UserService } from "./user.service";
import { successResponse, errorResponse } from "../../shared/apiResponse";

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
      const id = parseInt(req.params.id);
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
      const id = parseInt(req.params.id);
      const user = await userService.updateUser(id, req.body);
      if (!user) {
        return res.status(404).json(errorResponse("User not found"));
      }
      res.json(successResponse(user, "User updated successfully"));
    } catch (error: any) {
      res.status(400).json(errorResponse(error.message));
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const user = await userService.deleteUser(id);
      if (!user) {
        return res.status(404).json(errorResponse("User not found"));
      }
      res.json(successResponse(user, "User deleted successfully"));
    } catch (error: any) {
      res.status(500).json(errorResponse(error.message));
    }
  }
}
