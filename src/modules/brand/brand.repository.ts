import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class BrandRepository {
  async create(data: { name: string; code: string }) {
    return prisma.brand.create({
      data,
    });
  }

  async findAll() {
    return prisma.brand.findMany({
      where: { isDeleted: false },
    });
  }

  async findById(id: string) {
    return prisma.brand.findUnique({
      where: { id, isDeleted: false },
    });
  }

  async findByCode(code: string) {
    return prisma.brand.findUnique({
      where: { code, isDeleted: false },
    });
  }

  async update(id: string, data: { name?: string; code?: string }) {
    return prisma.brand.update({
      where: { id, isDeleted: false },
      data,
    });
  }

  async softDelete(id: string) {
    return prisma.brand.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}
