import { Request, Response } from "express";
import * as service from "./loan.service";
import { successResponse, errorResponse } from "../../shared/apiResponse";
import { AuthRequest } from "../../middlewares/auth.middleware";

/**
 * @swagger
 * /loans:
 *   get:
 *     summary: Get all loans
 *     tags: [Loans]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of loans
 *       500:
 *         description: Internal server error
 */
export const getAll = async (req: AuthRequest, res: Response) => {
  try {
    const loans = await service.getAll(req.user?.id, req.user?.role);
    res.json(successResponse(loans));
  } catch (error: any) {
    res.status(500).json(errorResponse(error.message));
  }
};

/**
 * @swagger
 * /loans:
 *   post:
 *     summary: Create a new loan
 *     tags: [Loans]
 *     security:
 *       - bearerAuth: []
 *     description: Only PEMINJAM can create loans
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               itemId:
 *                 type: integer
 *               qty:
 *                 type: integer
 *               borrowerName:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date-time
 *               endDate:
 *                 type: string
 *                 format: date-time
 *               purpose:
 *                 type: string
 *     responses:
 *       201:
 *         description: Loan created successfully
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Internal server error
 */
export const create = async (req: AuthRequest, res: Response) => {
  try {
    const { itemId, qty, borrowerName, startDate, endDate, purpose } = req.body;
    if (!itemId || !qty) {
      return res.status(400).json(errorResponse("itemId and qty are required"));
    }
    const data = await service.create(
      req.user!.id,
      itemId,
      qty,
      borrowerName,
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined,
      purpose
    );
    res.status(201).json(successResponse(data, "Loan created successfully"));
  } catch (error: any) {
    res.status(400).json(errorResponse(error.message));
  }
};

/**
 * @swagger
 * /loans/{id}/approve:
 *   put:
 *     summary: Approve a loan
 *     tags: [Loans]
 *     security:
 *       - bearerAuth: []
 *     description: Only PIMPINAN can approve loans
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Loan approved successfully
 *       400:
 *         description: Invalid status transition or insufficient stock
 *       404:
 *         description: Loan not found
 *       500:
 *         description: Internal server error
 */
export const approveLoan = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const data = await service.approveLoan(parseInt(id), req.user!.id);
    res.json(successResponse(data, "Loan approved successfully"));
  } catch (error: any) {
    if (error.message.includes("not found")) {
      res.status(404).json(errorResponse(error.message));
    } else {
      res.status(400).json(errorResponse(error.message));
    }
  }
};

/**
 * @swagger
 * /loans/{id}/reject:
 *   put:
 *     summary: Reject a loan
 *     tags: [Loans]
 *     security:
 *       - bearerAuth: []
 *     description: Only PIMPINAN can reject loans
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reason:
 *                 type: string
 *     responses:
 *       200:
 *         description: Loan rejected successfully
 *       400:
 *         description: Invalid status transition
 *       404:
 *         description: Loan not found
 *       500:
 *         description: Internal server error
 */
export const rejectLoan = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    const data = await service.rejectLoan(parseInt(id), req.user!.id, reason);
    res.json(successResponse(data, "Loan rejected successfully"));
  } catch (error: any) {
    if (error.message.includes("not found")) {
      res.status(404).json(errorResponse(error.message));
    } else {
      res.status(400).json(errorResponse(error.message));
    }
  }
};

/**
 * @swagger
 * /loans/{id}/return:
 *   put:
 *     summary: Return a loan
 *     tags: [Loans]
 *     security:
 *       - bearerAuth: []
 *     description: Only ADMIN or PETUGAS_GUDANG can return loans
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Loan returned successfully
 *       400:
 *         description: Invalid status transition
 *       404:
 *         description: Loan not found
 *       500:
 *         description: Internal server error
 */
export const returnLoan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await service.returnLoan(parseInt(id));
    res.json(successResponse(data, "Loan returned successfully"));
  } catch (error: any) {
    if (error.message.includes("not found")) {
      res.status(404).json(errorResponse(error.message));
    } else {
      res.status(400).json(errorResponse(error.message));
    }
  }
};
