import { prisma } from "../../config/database";

export const getStockReport = async () => {
  const items = await prisma.item.findMany({
    include: {
      stockIns: true,
      stockOuts: true,
      loans: true,
    },
  });

  return items.map(item => ({
    id: item.id,
    name: item.namaBarang,
    currentStock: item.quantity,
    totalStockIn: item.stockIns.reduce((sum, si) => sum + si.qty, 0),
    totalStockOut: item.stockOuts.reduce((sum, so) => sum + so.qty, 0),
    totalLoans: item.loans.reduce((sum, l) => sum + l.qty, 0),
  }));
};

export const getSummary = async () => {
  return {
    totalItems: await prisma.item.count(),
    totalSuppliers: await prisma.supplier.count(),
    totalStockIn: await prisma.stockIn.count(),
    totalStockOut: await prisma.stockOut.count(),
    totalLoans: await prisma.loan.count(),
  };
};
