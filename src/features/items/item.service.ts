import { ItemRepository } from "./item.repository";
import { ItemCodeGenerator } from "../../shared/itemCodeGenerator";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ItemService {
  private itemRepository = new ItemRepository();

  async createItem(data: {
    name: string;
    brandId: string;
    categoryId: string;
  }) {
    return prisma.$transaction(async tx => {
      // Check if brand exists and not deleted
      const brand = await tx.brand.findUnique({
        where: { id: data.brandId, isDeleted: false },
      });
      if (!brand) {
        throw new Error("Brand not found or deleted");
      }

      // Check if category exists and not deleted
      const category = await tx.category.findUnique({
        where: { id: data.categoryId, isDeleted: false },
      });
      if (!category) {
        throw new Error("Category not found or deleted");
      }

      // Generate item code
      const itemCode = await ItemCodeGenerator.generateItemCode(
        brand.code,
        category.code
      );

      // Check if itemCode already exists (should not, but safety)
      const existingItem = await tx.item.findUnique({
        where: { itemCode },
      });
      if (existingItem) {
        throw new Error("Item code generation conflict");
      }

      return this.itemRepository.create({ ...data, itemCode });
    });
  }

  async getAllItems() {
    return this.itemRepository.findAll();
  }

  async getItemById(id: string) {
    const item = await this.itemRepository.findById(id);
    if (!item) {
      throw new Error("Item not found");
    }
    return item;
  }

  async updateItem(id: string, data: { name?: string }) {
    const item = await this.itemRepository.findById(id);
    if (!item) {
      throw new Error("Item not found");
    }

    return this.itemRepository.update(id, data);
  }

  async deleteItem(id: string) {
    const item = await this.itemRepository.findById(id);
    if (!item) {
      throw new Error("Item not found");
    }

    return this.itemRepository.delete(id);
  }
}
