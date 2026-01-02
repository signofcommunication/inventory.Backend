import * as repo from "./supplier.repository";
import { Supplier } from "@prisma/client";

export const getAll = (): Promise<Supplier[]> => {
  return repo.findAll();
};

export const getById = (id: string): Promise<Supplier | null> => {
  return repo.findById(id);
};

export const create = (data: {
  name: string;
  phone?: string;
  address?: string;
}): Promise<Supplier> => {
  if (!data.name) {
    throw new Error("Name is required");
  }
  return repo.create(data);
};

export const update = (
  id: string,
  data: Partial<{ name: string; phone?: string; address?: string }>
): Promise<Supplier> => {
  return repo.update(id, data);
};

export const remove = (id: string): Promise<Supplier> => {
  return repo.remove(id);
};
