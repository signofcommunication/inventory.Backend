import { prisma } from "../../config/database";
import { Category } from "@prisma/client";

export const findAll = (): Promise<Category[]> => {
  return prisma.category.findMany();
};

export const findById = (id: number): Promise<Category | null> => {
  return prisma.category.findUnique({
    where: { id },
  });
};

export const findByName = (name: string): Promise<Category | null> => {
  return prisma.category.findFirst({
    where: { name },
  });
};

export const create = (data: {
  name: string;
  description?: string;
}): Promise<Category> => {
  return prisma.category.create({
    data,
  });
};

export const update = (
  id: number,
  data: { name?: string; description?: string }
): Promise<Category> => {
  return prisma.category.update({
    where: { id },
    data,
  });
};

export const remove = (id: number): Promise<Category> => {
  return prisma.category.delete({
    where: { id },
  });
};

export const hasItems = (id: number): Promise<boolean> => {
  return prisma.item
    .count({
      where: { kategoriId: id },
    })
    .then((count: number) => count > 0);
};
