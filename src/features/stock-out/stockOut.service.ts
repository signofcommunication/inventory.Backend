import { prisma } from "../../config/database";
import { StockOut } from "@prisma/client";

export const getAll = (): Promise<StockOut[]> => {
  return prisma.stockOut.findMany({
    include: { item: true },
  });
};

export const create = async (itemId: number, qty: number) => {
  if (qty <= 0) {
    throw new Error("Quantity must be positive");
  }
  const item = await prisma.item.findUnique({ where: { id: itemId } });
  if (!item || item.quantity < qty) {
    throw new Error("Insufficient stock");
  }

  await prisma.item.update({
    where: { id: itemId },
    data: { quantity: { decrement: qty } },
  });

  return prisma.stockOut.create({ data: { itemId, qty } });
};
