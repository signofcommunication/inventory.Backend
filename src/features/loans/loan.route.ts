import { Router } from "express";
import * as controller from "./loan.controller";
import { roleGuard } from "../../middlewares/role.middleware";
import { Role } from "@prisma/client";

const router = Router();

/**
 * @swagger
 * /loans:
 *   get:
 *     summary: Get all loans
 *     tags: [Loans]
 *     security:
 *       - bearerAuth: []
 *     description: PEMINJAM can view own loans, others can view all
 *     responses:
 *       200:
 *         description: Loans retrieved successfully
 *   post:
 *     summary: Create a new loan
 *     tags: [Loans]
 *     security:
 *       - bearerAuth: []
 *     description: Only PEMINJAM
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
 */
router.get("/", controller.getAll);
router.post("/", roleGuard([Role.PEMINJAM]), controller.create);

/**
 * @swagger
 * /loans/{id}/approve:
 *   put:
 *     summary: Approve a loan
 *     tags: [Loans]
 *     security:
 *       - bearerAuth: []
 *     description: Only PIMPINAN
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Loan approved successfully
 */
router.put("/:id/approve", roleGuard([Role.PIMPINAN]), controller.approveLoan);

/**
 * @swagger
 * /loans/{id}/reject:
 *   put:
 *     summary: Reject a loan
 *     tags: [Loans]
 *     security:
 *       - bearerAuth: []
 *     description: Only PIMPINAN
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
 */
router.put("/:id/reject", roleGuard([Role.PIMPINAN]), controller.rejectLoan);

/**
 * @swagger
 * /loans/{id}/return:
 *   put:
 *     summary: Return a loan
 *     tags: [Loans]
 *     security:
 *       - bearerAuth: []
 *     description: Only ADMIN or PETUGAS_GUDANG
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Loan returned successfully
 */
router.put(
  "/:id/return",
  roleGuard([Role.ADMIN, Role.PETUGAS_GUDANG]),
  controller.returnLoan
);

export default router;
