import { prisma } from "../../config/database";
import { StockIn } from "@prisma/client";

export const getAll = (): Promise<StockIn[]> => {
  return prisma.stockIn.findMany({
    include: { item: true, supplier: true },
  });
};

export const create = async (
  itemId: number,
  supplierId: number,
  qty: number
): Promise<StockIn> => {
  if (qty <= 0) {
    throw new Error("Quantity must be positive");
  }

  return prisma.$transaction(async tx => {
    // Validate item exists
    const item = await tx.item.findUnique({ where: { id: itemId } });
    if (!item) {
      throw new Error("Item not found");
    }

    // Validate supplier exists
    const supplier = await tx.supplier.findUnique({
      where: { id: supplierId },
    });
    if (!supplier) {
      throw new Error("Supplier not found");
    }

    // Update item quantity
    await tx.item.update({
      where: { id: itemId },
      data: { quantity: { increment: qty } },
    });

    // Create stock in record
    return tx.stockIn.create({
      data: { itemId, supplierId, qty },
      include: { item: true, supplier: true },
    });
  });
};
