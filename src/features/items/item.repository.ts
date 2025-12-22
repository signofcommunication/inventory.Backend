import { prisma } from "../../config/database";
import { Item } from "@prisma/client";

export const findAll = (): Promise<Item[]> => {
  return prisma.item.findMany({
    include: { category: true },
  });
};

export const findById = (id: number): Promise<Item | null> => {
  return prisma.item.findUnique({
    where: { id },
    include: { category: true },
  });
};

export const create = (data: {
  kodeBarang: string;
  namaBarang: string;
  kategoriId: number;
  quantity: number;
  unit: string;
  fotoBarang?: string;
}): Promise<Item> => {
  return prisma.item.create({
    data,
    include: { category: true },
  });
};

export const update = async (
  id: number,
  data: Partial<{
    namaBarang: string;
    kategoriId: number;
    quantity: number;
    unit: string;
    fotoBarang?: string;
  }>
): Promise<Item> => {
  const result = await prisma.item.update({
    where: { id },
    data,
    include: { category: true },
  });
  return result;
};

export const remove = (id: number): Promise<Item> => {
  return prisma.item.delete({
    where: { id },
  });
};
