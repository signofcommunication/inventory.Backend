import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class CategoryRepository {
  async create(data: { name: string; description?: string }) {
    const code = data.name.substring(0, 3).toUpperCase();
    return prisma.category.create({
      data: {
        ...data,
        code,
      },
    });
  }

  async findAll() {
    return prisma.category.findMany({
      where: { isDeleted: false },
    });
  }

  async findById(id: string) {
    if (!id) {
      return null;
    }
    return prisma.category.findFirst({
      where: { id, isDeleted: false },
    });
  }

  async findByCode(code: string) {
    if (!code) {
      return null;
    }
    return prisma.category.findFirst({
      where: { code, isDeleted: false },
    });
  }

  async update(id: string, data: { name?: string; description?: string }) {
    return prisma.category.update({
      where: { id, isDeleted: false },
      data,
    });
  }

  async softDelete(id: string) {
    return prisma.category.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}
