import * as repo from "./item.repository";
import { Item } from "@prisma/client";
import { prisma } from "../../config/database";

export const getAll = (): Promise<Item[]> => {
  return repo.findAll();
};

export const getById = (id: number): Promise<Item | null> => {
  return repo.findById(id);
};

export const create = async (data: {
  kodeBarang: string;
  namaBarang: string;
  kategoriId: number;
  unit: string;
  fotoBarang?: string;
}): Promise<Item> => {
  if (!data.kodeBarang || !data.namaBarang || !data.unit) {
    throw new Error("kodeBarang, namaBarang, and unit are required");
  }
  // Check if kategoriId exists
  const category = await prisma.category.findUnique({
    where: { id: data.kategoriId },
  });
  if (!category) {
    throw new Error("Invalid kategoriId: category does not exist");
  }
  // Check if kodeBarang is unique
  const existing = await prisma.item.findUnique({
    where: { kodeBarang: data.kodeBarang },
  });
  if (existing) {
    throw new Error("kodeBarang must be unique");
  }
  const createData = {
    kodeBarang: data.kodeBarang,
    namaBarang: data.namaBarang,
    kategoriId: data.kategoriId,
    quantity: 0, // Always start with 0
    unit: data.unit,
    fotoBarang: data.fotoBarang,
  };
  return repo.create(createData);
};

export const update = async (
  id: number,
  data: Partial<{
    namaBarang: string;
    kategoriId: number;
    unit: string;
    fotoBarang?: string;
  }>
): Promise<Item> => {
  // Quantity is not allowed to be updated directly
  if (data.kategoriId !== undefined) {
    const category = await prisma.category.findUnique({
      where: { id: data.kategoriId },
    });
    if (!category) {
      throw new Error("Invalid kategoriId: category does not exist");
    }
  }
  return repo.update(id, data);
};

export const remove = async (id: number): Promise<Item> => {
  // Check if item has any transactions
  const item = await prisma.item.findUnique({
    where: { id },
    include: {
      stockIns: true,
      stockOuts: true,
      loans: true,
    },
  });
  if (!item) {
    throw new Error("Item not found");
  }
  if (item.stockIns.length > 0 || item.stockOuts.length > 0 || item.loans.length > 0) {
    throw new Error("Cannot delete item with existing transactions");
  }
  return repo.remove(id);
};
