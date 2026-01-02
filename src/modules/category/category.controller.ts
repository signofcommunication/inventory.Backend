// filepath: c:\Users\yamad\OneDrive\Documents\Work\Skripsi - Stanley Tedjadinata\inventory.Backend\src\modules\category\category.controller.ts
import { Request, Response } from "express";
import { CategoryService } from "./category.service";
import { AuthRequest } from "../../middlewares/auth.middleware";

const categoryService = new CategoryService();

export class CategoryController {
  async createCategory(req: AuthRequest, res: Response) {
    try {
      const { name, description } = req.body;

      // Validate required fields
      if (!name) {
        return res
          .status(400)
          .json({ success: false, message: "Name is required" });
      }

      const category = await categoryService.createCategory({
        name,
        description,
      });
      res.status(201).json({ success: true, data: category });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async getAllCategories(req: AuthRequest, res: Response) {
    try {
      const categories = await categoryService.getAllCategories();
      res.json({ success: true, data: categories });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getCategoryById(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const category = await categoryService.getCategoryById(id);
      res.json({ success: true, data: category });
    } catch (error: any) {
      if (error.message === "Category not found") {
        res.status(404).json({ success: false, message: error.message });
      } else {
        res.status(500).json({ success: false, message: error.message });
      }
    }
  }

  async updateCategory(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
      const category = await categoryService.updateCategory(id, {
        name,
        description,
      });
      res.json({ success: true, data: category });
    } catch (error: any) {
      if (error.message === "Category not found") {
        res.status(404).json({ success: false, message: error.message });
      } else {
        res.status(400).json({ success: false, message: error.message });
      }
    }
  }

  async deleteCategory(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      await categoryService.deleteCategory(id);
      res.json({ success: true, message: "Category deleted successfully" });
    } catch (error: any) {
      if (error.message === "Category not found") {
        res.status(404).json({ success: false, message: error.message });
      } else {
        res.status(500).json({ success: false, message: error.message });
      }
    }
  }
}
