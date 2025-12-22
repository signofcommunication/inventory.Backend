import { prisma } from "../../config/database";
import { Loan, LoanStatus } from "@prisma/client";
import * as repository from "./loan.repository";

export const getAll = (userId?: number, role?: string): Promise<Loan[]> => {
  const where: any = {};
  if (role === "PEMINJAM" && userId) {
    where.userId = userId;
  }
  return repository.getAll(where);
};

export const create = async (
  userId: number,
  itemId: number,
  qty: number,
  borrowerName?: string,
  startDate?: Date,
  endDate?: Date,
  purpose?: string
) => {
  if (qty <= 0) {
    throw new Error("Quantity must be greater than 0");
  }

  const item = await prisma.item.findUnique({ where: { id: itemId } });
  if (!item) {
    throw new Error("Item not found");
  }

  // If borrowerName not provided, get from user
  if (!borrowerName) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    borrowerName = user?.name;
  }

  // For creation, we don't decrease stock yet - only after approval
  return repository.create(
    userId,
    itemId,
    qty,
    borrowerName,
    startDate,
    endDate,
    purpose
  );
};

export const approveLoan = async (loanId: number, approvedById: number) => {
  const loan = await repository.findByIdWithItem(loanId);
  if (!loan) {
    throw new Error("Loan not found");
  }

  if (loan.status !== LoanStatus.PENDING) {
    throw new Error("Loan is not in pending status");
  }

  const item = await prisma.item.findUnique({ where: { id: loan.itemId } });
  if (!item || item.quantity < loan.qty) {
    throw new Error("Insufficient stock for approval");
  }

  // Decrease stock
  await prisma.item.update({
    where: { id: loan.itemId },
    data: { quantity: { decrement: loan.qty } },
  });

  return repository.updateStatus(
    loanId,
    LoanStatus.APPROVED,
    approvedById,
    new Date()
  );
};

export const rejectLoan = async (
  loanId: number,
  approvedById: number,
  reason?: string
) => {
  const loan = await repository.findByIdWithItem(loanId);
  if (!loan) {
    throw new Error("Loan not found");
  }

  if (loan.status !== LoanStatus.PENDING) {
    throw new Error("Loan is not in pending status");
  }

  // No stock change for rejection
  return repository.updateStatus(
    loanId,
    LoanStatus.REJECTED,
    approvedById,
    new Date(),
    reason
  );
};

export const returnLoan = async (loanId: number) => {
  const loan = await repository.findByIdWithItem(loanId);
  if (!loan) {
    throw new Error("Loan not found");
  }

  if (loan.status !== LoanStatus.APPROVED) {
    throw new Error("Only approved loans can be returned");
  }

  // Increase stock back
  await prisma.item.update({
    where: { id: loan.itemId },
    data: { quantity: { increment: loan.qty } },
  });

  return repository.updateStatus(loanId, LoanStatus.RETURNED);
};
