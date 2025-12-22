import * as repo from "./supplier.repository";
import { Supplier } from "@prisma/client";

export const getAll = (): Promise<Supplier[]> => {
  return repo.findAll();
};

export const getById = (id: number): Promise<Supplier | null> => {
  return repo.findById(id);
};

export const create = (data: {
  name: string;
  phone?: string;
}): Promise<Supplier> => {
  if (!data.name) {
    throw new Error("Name is required");
  }
  return repo.create(data);
};

export const update = (
  id: number,
  data: Partial<{ name: string; phone?: string }>
): Promise<Supplier> => {
  return repo.update(id, data);
};

export const remove = (id: number): Promise<Supplier> => {
  return repo.remove(id);
};
