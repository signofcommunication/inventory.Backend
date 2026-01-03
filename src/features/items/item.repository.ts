import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ItemRepository {
  async create(data: {
    name: string;
    brandId: string;
    categoryId: string;
    itemCode: string;
    imageUrl: string;
  }) {
    return prisma.item.create({
      data,
      include: {
        brand: true,
        category: true,
      },
    });
  }

  async findAll() {
    return prisma.item.findMany({
      include: {
        brand: true,
        category: true,
      },
    });
  }

  async findById(id: string) {
    return prisma.item.findUnique({
      where: { id },
      include: {
        brand: true,
        category: true,
      },
    });
  }

  async findByItemCode(itemCode: string) {
    return prisma.item.findUnique({
      where: { itemCode },
      include: {
        brand: true,
        category: true,
      },
    });
  }

  async update(id: string, data: { name?: string; imageUrl?: string }) {
    return prisma.item.update({
      where: { id },
      data,
      include: {
        brand: true,
        category: true,
      },
    });
  }

  async delete(id: string) {
    return prisma.item.delete({
      where: { id },
    });
  }
}
