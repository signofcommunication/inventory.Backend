import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ItemCodeGenerator {
  static async generateItemCode(
    brandCode: string,
    categoryCode: string
  ): Promise<string> {
    // Find the last item with the same brand and category
    const lastItem = await prisma.item.findFirst({
      where: {
        brand: { code: brandCode },
        category: { code: categoryCode },
      },
      orderBy: { itemCode: "desc" },
    });

    let nextNumber = 1;
    if (lastItem && lastItem.itemCode) {
      // Extract the last 4 digits
      const lastCode = lastItem.itemCode;
      const lastNumberStr = lastCode.slice(-4);
      const lastNumber = parseInt(lastNumberStr, 10);
      nextNumber = lastNumber + 1;
    }

    // Pad to 4 digits
    const paddedNumber = nextNumber.toString().padStart(4, "0");

    return `${brandCode}-${categoryCode}-${paddedNumber}`;
  }
}
