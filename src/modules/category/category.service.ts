import * as repo from "./category.repository";
import { Category } from "@prisma/client";
import { CreateCategoryDTO, UpdateCategoryDTO } from "./category.types";

export class CategoryService {
  async getAll(): Promise<Category[]> {
    return repo.findAll();
  }

  async getById(id: number): Promise<Category | null> {
    return repo.findById(id);
  }

  async create(data: CreateCategoryDTO): Promise<Category> {
    if (!data.name || data.name.trim() === "") {
      throw new Error("Category name is required");
    }
    const existing = await repo.findByName(data.name);
    if (existing) {
      throw new Error("Category name must be unique");
    }
    return repo.create(data);
  }

  async update(id: number, data: UpdateCategoryDTO): Promise<Category> {
    const category = await repo.findById(id);
    if (!category) {
      throw new Error("Category not found");
    }
    if (data.name && data.name !== category.name) {
      const existing = await repo.findByName(data.name);
      if (existing) {
        throw new Error("Category name must be unique");
      }
    }
    return repo.update(id, data);
  }

  async remove(id: number): Promise<Category> {
    const category = await repo.findById(id);
    if (!category) {
      throw new Error("Category not found");
    }
    // Check if category is used by items
    const hasItems = await repo.hasItems(id);
    if (hasItems) {
      throw new Error("Cannot delete category that is used by items");
    }
    return repo.remove(id);
  }
}
