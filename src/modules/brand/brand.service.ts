import { BrandRepository } from "./brand.repository";

export class BrandService {
  private brandRepository = new BrandRepository();

  async createBrand(data: { name: string; code: string }) {
    // Check if code already exists
    const existingBrand = await this.brandRepository.findByCode(data.code);
    if (existingBrand) {
      throw new Error("Brand code already exists");
    }

    return this.brandRepository.create(data);
  }

  async getAllBrands() {
    return this.brandRepository.findAll();
  }

  async getBrandById(id: string) {
    const brand = await this.brandRepository.findById(id);
    if (!brand) {
      throw new Error("Brand not found");
    }
    return brand;
  }

  async updateBrand(id: string, data: { name?: string; code?: string }) {
    // Code cannot be updated
    if (data.code) {
      throw new Error("Brand code cannot be updated");
    }

    const brand = await this.brandRepository.findById(id);
    if (!brand) {
      throw new Error("Brand not found");
    }

    return this.brandRepository.update(id, data);
  }

  async deleteBrand(id: string) {
    const brand = await this.brandRepository.findById(id);
    if (!brand) {
      throw new Error("Brand not found");
    }

    return this.brandRepository.softDelete(id);
  }
}
