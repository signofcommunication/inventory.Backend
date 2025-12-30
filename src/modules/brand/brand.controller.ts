import { Request, Response } from "express";
import { BrandService } from "./brand.service";
import { AuthRequest } from "../../middlewares/auth.middleware";

const brandService = new BrandService();

export class BrandController {
  async createBrand(req: AuthRequest, res: Response) {
    try {
      const { name, code } = req.body;
      const brand = await brandService.createBrand({ name, code });
      res.status(201).json({ success: true, data: brand });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async getAllBrands(req: AuthRequest, res: Response) {
    try {
      const brands = await brandService.getAllBrands();
      res.json({ success: true, data: brands });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getBrandById(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const brand = await brandService.getBrandById(id);
      res.json({ success: true, data: brand });
    } catch (error: any) {
      if (error.message === "Brand not found") {
        res.status(404).json({ success: false, message: error.message });
      } else {
        res.status(500).json({ success: false, message: error.message });
      }
    }
  }

  async updateBrand(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const brand = await brandService.updateBrand(id, { name });
      res.json({ success: true, data: brand });
    } catch (error: any) {
      if (error.message === "Brand not found") {
        res.status(404).json({ success: false, message: error.message });
      } else {
        res.status(400).json({ success: false, message: error.message });
      }
    }
  }

  async deleteBrand(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      await brandService.deleteBrand(id);
      res.json({ success: true, message: "Brand deleted successfully" });
    } catch (error: any) {
      if (error.message === "Brand not found") {
        res.status(404).json({ success: false, message: error.message });
      } else {
        res.status(500).json({ success: false, message: error.message });
      }
    }
  }
}
