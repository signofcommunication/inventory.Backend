import { Request, Response } from "express";
import { ItemService } from "./item.service";
import { AuthRequest } from "../../middlewares/auth.middleware";
import multer from "multer";
import path from "path";

const itemService = new ItemService();

// Configure multer for item images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/items/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
});

export class ItemController {
  async createItem(req: AuthRequest, res: Response) {
    try {
      const { name, brandId, categoryId } = req.body;
      const file = req.file;
      if (!file) {
        return res
          .status(400)
          .json({ success: false, message: "Image is required" });
      }
      const imageUrl = `/uploads/items/${file.filename}`;
      const item = await itemService.createItem({
        name,
        brandId,
        categoryId,
        imageUrl,
      });
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
      const file = req.file;
      const updateData: { name?: string; imageUrl?: string } = { name };
      if (file) {
        updateData.imageUrl = `/uploads/items/${file.filename}`;
      }
      const item = await itemService.updateItem(id, updateData);
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
