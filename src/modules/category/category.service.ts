import { CategoryRepository } from "./category.repository";

export class CategoryService {
  private categoryRepository = new CategoryRepository();

  async createCategory(data: { name: string; description?: string }) {
    // Validate input
    if (!data.name) {
      throw new Error("Name is required");
    }

    // Generate code from first 3 letters of name, uppercase
    const code = data.name.substring(0, 3).toUpperCase();

    // Check if code already exists
    const existingCategory = await this.categoryRepository.findByCode(code);
    if (existingCategory) {
      throw new Error(
        `Generated category code '${code}' already exists. Please choose a different name.`
      );
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

  async updateCategory(
    id: string,
    data: { name?: string; description?: string }
  ) {
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
