// filepath: c:\Users\yamad\OneDrive\Documents\Work\Skripsi - Stanley Tedjadinata\inventory.Backend\src\modules\category\category.controller.ts
import { Request, Response } from "express";
import { CategoryService } from "./category.service";
import { successResponse, errorResponse } from "../../shared/apiResponse";

const categoryService = new CategoryService();

export class CategoryController {
  async getAll(req: Request, res: Response) {
    try {
      const categories = await categoryService.getAll();
      res.json(
        successResponse(categories, "Categories retrieved successfully")
      );
    } catch (error: any) {
      res.status(500).json(errorResponse(error.message));
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const category = await categoryService.getById(id);
      if (!category) {
        return res.status(404).json(errorResponse("Category not found"));
      }
      res.json(successResponse(category, "Category retrieved successfully"));
    } catch (error: any) {
      res.status(500).json(errorResponse(error.message));
    }
  }

  async create(req: Request, res: Response) {
    try {
      const category = await categoryService.create(req.body);
      res
        .status(201)
        .json(successResponse(category, "Category created successfully"));
    } catch (error: any) {
      res.status(400).json(errorResponse(error.message));
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const category = await categoryService.update(id, req.body);
      res.json(successResponse(category, "Category updated successfully"));
    } catch (error: any) {
      res.status(400).json(errorResponse(error.message));
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const category = await categoryService.remove(id);
      res.json(successResponse(category, "Category deleted successfully"));
    } catch (error: any) {
      res.status(400).json(errorResponse(error.message));
    }
  }
}
