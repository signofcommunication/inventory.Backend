import { prisma } from "../../config/database";
import { StockIn } from "@prisma/client";

export const getAll = (): Promise<StockIn[]> => {
  return prisma.stockIn.findMany({
    include: { item: true },
  });
};

export const create = async (itemId: number, qty: number) => {
  if (qty <= 0) {
    throw new Error("Quantity must be positive");
  }
  await prisma.item.update({
    where: { id: itemId },
    data: { quantity: { increment: qty } },
  });

  return prisma.stockIn.create({
    data: { itemId, qty },
  });
};
