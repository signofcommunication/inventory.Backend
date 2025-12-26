import { prisma } from "../../config/database";
import { StockOut } from "@prisma/client";

export const getAll = (): Promise<StockOut[]> => {
  return prisma.stockOut.findMany({
    include: { item: true },
  });
};

export const create = async (
  itemId: number,
  qty: number,
  reason?: string
): Promise<StockOut> => {
  if (qty <= 0) {
    throw new Error("Quantity must be positive");
  }

  return prisma.$transaction(async tx => {
    // Validate item exists and has sufficient stock
    const item = await tx.item.findUnique({ where: { id: itemId } });
    if (!item) {
      throw new Error("Item not found");
    }
    if (item.quantity < qty) {
      throw new Error("Insufficient stock");
    }

    // Update item quantity
    await tx.item.update({
      where: { id: itemId },
      data: { quantity: { decrement: qty } },
    });

    // Create stock out record
    return tx.stockOut.create({
      data: { itemId, qty, reason },
      include: { item: true },
    });
  });
};
