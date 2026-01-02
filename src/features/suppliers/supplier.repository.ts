import { prisma } from "../../config/database";
import { Supplier } from "@prisma/client";

export const findAll = (): Promise<Supplier[]> => {
  return prisma.supplier.findMany();
};

export const findById = (id: string): Promise<Supplier | null> => {
  return prisma.supplier.findUnique({
    where: { id },
  });
};

export const create = (data: {
  name: string;
  phone?: string;
  address?: string;
}): Promise<Supplier> => {
  return prisma.supplier.create({
    data,
  });
};

export const update = (
  id: string,
  data: Partial<{ name: string; phone?: string; address?: string }>
): Promise<Supplier> => {
  return prisma.supplier.update({
    where: { id },
    data,
  });
};

export const remove = (id: string): Promise<Supplier> => {
  return prisma.supplier.delete({
    where: { id },
  });
};
