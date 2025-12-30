import { Request, Response } from "express";
import { ItemService } from "./item.service";
import { AuthRequest } from "../../middlewares/auth.middleware";

const itemService = new ItemService();

export class ItemController {
  async createItem(req: AuthRequest, res: Response) {
    try {
      const { name, brandId, categoryId } = req.body;
      const item = await itemService.createItem({ name, brandId, categoryId });
      res.status(201).json({ success: true, data: item });
    } catch (error: any) {
      if (error.message.includes("not found or deleted")) {
        res.status(400).json({ success: false, message: error.message });
      } else {
        res.status(400).json({ success: false, message: error.message });
      }
    }
  }

  async getAllItems(req: AuthRequest, res: Response) {
    try {
      const items = await itemService.getAllItems();
      res.json({ success: true, data: items });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getItemById(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const item = await itemService.getItemById(id);
      res.json({ success: true, data: item });
    } catch (error: any) {
      if (error.message === "Item not found") {
        res.status(404).json({ success: false, message: error.message });
      } else {
        res.status(500).json({ success: false, message: error.message });
      }
    }
  }

  async updateItem(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const item = await itemService.updateItem(id, { name });
      res.json({ success: true, data: item });
    } catch (error: any) {
      if (error.message === "Item not found") {
        res.status(404).json({ success: false, message: error.message });
      } else {
        res.status(400).json({ success: false, message: error.message });
      }
    }
  }

  async deleteItem(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      await itemService.deleteItem(id);
      res.json({ success: true, message: "Item deleted successfully" });
    } catch (error: any) {
      if (error.message === "Item not found") {
        res.status(404).json({ success: false, message: error.message });
      } else {
        res.status(500).json({ success: false, message: error.message });
      }
    }
  }
}
