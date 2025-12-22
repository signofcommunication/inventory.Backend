// filepath: c:\Users\yamad\OneDrive\Documents\Work\Skripsi - Stanley Tedjadinata\inventory.Backend\src\features\loans\loan.repository.ts
import { prisma } from "../../config/database";
import { Loan, LoanStatus } from "@prisma/client";

export const findByIdWithItem = (id: number): Promise<Loan | null> => {
  return prisma.loan.findUnique({
    where: { id },
    include: { item: true, user: true, approvedBy: true },
  });
};

export const updateStatus = async (
  id: number,
  status: LoanStatus,
  approvedById?: number,
  approvedAt?: Date,
  rejectionReason?: string
): Promise<Loan> => {
  return prisma.loan.update({
    where: { id },
    data: {
      status,
      approvedById,
      approvedAt,
      rejectionReason,
      updatedAt: new Date(),
    },
    include: { item: true, user: true, approvedBy: true },
  });
};

export const getAll = (where?: any): Promise<Loan[]> => {
  return prisma.loan.findMany({
    where,
    include: { item: true, user: true, approvedBy: true },
    orderBy: { createdAt: "desc" },
  });
};

export const create = async (
  userId: number,
  itemId: number,
  qty: number,
  borrowerName?: string,
  startDate?: Date,
  endDate?: Date,
  purpose?: string
): Promise<Loan> => {
  return prisma.loan.create({
    data: { userId, itemId, qty, borrowerName, startDate, endDate, purpose },
    include: { item: true, user: true },
  });
};
