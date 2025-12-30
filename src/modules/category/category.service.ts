import { CategoryRepository } from "./category.repository";

export class CategoryService {
  private categoryRepository = new CategoryRepository();

  async createCategory(data: { name: string; code: string }) {
    // Check if code already exists
    const existingCategory = await this.categoryRepository.findByCode(
      data.code
    );
    if (existingCategory) {
      throw new Error("Category code already exists");
    }

    return this.categoryRepository.create(data);
  }

  async getAllCategories() {
    return this.categoryRepository.findAll();
  }

  async getCategoryById(id: string) {
    const category = await this.categoryRepository.findById(id);
    if (!category) {
      throw new Error("Category not found");
    }
    return category;
  }

  async updateCategory(id: string, data: { name?: string; code?: string }) {
    // Code cannot be updated
    if (data.code) {
      throw new Error("Category code cannot be updated");
    }

    const category = await this.categoryRepository.findById(id);
    if (!category) {
      throw new Error("Category not found");
    }

    return this.categoryRepository.update(id, data);
  }

  async deleteCategory(id: string) {
    const category = await this.categoryRepository.findById(id);
    if (!category) {
      throw new Error("Category not found");
    }

    return this.categoryRepository.softDelete(id);
  }
}
