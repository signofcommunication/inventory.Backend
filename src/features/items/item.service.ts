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
  quantity?: number;
  unit: string;
  fotoBarang?: string;
}): Promise<Item> => {
  if (!data.kodeBarang || !data.namaBarang || !data.unit) {
    throw new Error("kodeBarang, namaBarang, and unit are required");
  }
  if (data.quantity !== undefined && data.quantity < 0) {
    throw new Error("Quantity must be non-negative");
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
    quantity: data.quantity ?? 0,
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
    quantity: number;
    unit: string;
    fotoBarang?: string;
  }>
): Promise<Item> => {
  if (data.quantity !== undefined && data.quantity < 0) {
    throw new Error("Quantity must be non-negative");
  }
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

export const remove = (id: number): Promise<Item> => {
  return repo.remove(id);
};
