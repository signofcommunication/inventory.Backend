import { Router } from "express";
import * as controller from "./report.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { roleGuard } from "../../middlewares/role.middleware";

const router = Router();

/**
 * @swagger
 * /reports/stock:
 *   get:
 *     summary: Get stock report
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     description: Only SUPERADMIN, ADMIN, and PIMPINAN
 *     responses:
 *       200:
 *         description: Stock report retrieved successfully
 */
/**
 * @swagger
 * /reports/stock/pdf:
 *   get:
 *     summary: Get stock report as PDF
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     description: Only SUPERADMIN, ADMIN, and PIMPINAN
 *     responses:
 *       200:
 *         description: PDF report retrieved successfully
 */
router.get(
  "/stock",
  authMiddleware,
  roleGuard(["SUPERADMIN", "ADMIN", "PIMPINAN"]),
  controller.getStockReport
);
router.get(
  "/stock/pdf",
  authMiddleware,
  roleGuard(["SUPERADMIN", "ADMIN", "PIMPINAN"]),
  controller.getStockReportPDF
);

/**
 * @swagger
 * /reports/transactions:
 *   get:
 *     summary: Get transaction report
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     description: Only SUPERADMIN, ADMIN, and PIMPINAN
 *     responses:
 *       200:
 *         description: Transaction report retrieved successfully
 */
/**
 * @swagger
 * /reports/transactions/pdf:
 *   get:
 *     summary: Get transaction report as PDF
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     description: Only SUPERADMIN, ADMIN, and PIMPINAN
 *     responses:
 *       200:
 *         description: PDF report retrieved successfully
 */
router.get(
  "/transactions",
  authMiddleware,
  roleGuard(["SUPERADMIN", "ADMIN", "PIMPINAN"]),
  controller.getTransactionReport
);
router.get(
  "/transactions/pdf",
  authMiddleware,
  roleGuard(["SUPERADMIN", "ADMIN", "PIMPINAN"]),
  controller.getTransactionReportPDF
);

/**
 * @swagger
 * /reports/loans:
 *   get:
 *     summary: Get loan report
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     description: Only SUPERADMIN, ADMIN, and PIMPINAN
 *     responses:
 *       200:
 *         description: Loan report retrieved successfully
 */
/**
 * @swagger
 * /reports/loans/pdf:
 *   get:
 *     summary: Get loan report as PDF
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     description: Only SUPERADMIN, ADMIN, and PIMPINAN
 *     responses:
 *       200:
 *         description: PDF report retrieved successfully
 */
router.get(
  "/loans",
  authMiddleware,
  roleGuard(["SUPERADMIN", "ADMIN", "PIMPINAN"]),
  controller.getLoanReport
);
router.get(
  "/loans/pdf",
  authMiddleware,
  roleGuard(["SUPERADMIN", "ADMIN", "PIMPINAN"]),
  controller.getLoanReportPDF
);

/**
 * @swagger
 * /reports/suppliers:
 *   get:
 *     summary: Get supplier report
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     description: Only SUPERADMIN, ADMIN, and PIMPINAN
 *     responses:
 *       200:
 *         description: Supplier report retrieved successfully
 */
/**
 * @swagger
 * /reports/suppliers/pdf:
 *   get:
 *     summary: Get supplier report as PDF
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     description: Only SUPERADMIN, ADMIN, and PIMPINAN
 *     responses:
 *       200:
 *         description: PDF report retrieved successfully
 */
router.get(
  "/suppliers",
  authMiddleware,
  roleGuard(["SUPERADMIN", "ADMIN", "PIMPINAN"]),
  controller.getSupplierReport
);
router.get(
  "/suppliers/pdf",
  authMiddleware,
  roleGuard(["SUPERADMIN", "ADMIN", "PIMPINAN"]),
  controller.getSupplierReportPDF
);

/**
 * @swagger
 * /reports/summary:
 *   get:
 *     summary: Get summary report
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     description: Only SUPERADMIN, ADMIN, and PIMPINAN
 *     responses:
 *       200:
 *         description: Summary report retrieved successfully
 */
/**
 * @swagger
 * /reports/summary/pdf:
 *   get:
 *     summary: Get summary report as PDF
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     description: Only SUPERADMIN, ADMIN, and PIMPINAN
 *     responses:
 *       200:
 *         description: PDF report retrieved successfully
 */
router.get(
  "/summary",
  authMiddleware,
  roleGuard(["SUPERADMIN", "ADMIN", "PIMPINAN"]),
  controller.getSummary
);
router.get(
  "/summary/pdf",
  authMiddleware,
  roleGuard(["SUPERADMIN", "ADMIN", "PIMPINAN"]),
  controller.getSummaryPDF
);

/**
 * @swagger
 * /reports/user-activity:
 *   get:
 *     summary: Get user activity report
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     description: Only SUPERADMIN and ADMIN
 *     responses:
 *       200:
 *         description: User activity report retrieved successfully
 */
/**
 * @swagger
 * /reports/user-activity/pdf:
 *   get:
 *     summary: Get user activity report as PDF
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     description: Only SUPERADMIN and ADMIN
 *     responses:
 *       200:
 *         description: PDF report retrieved successfully
 */
router.get(
  "/user-activity",
  authMiddleware,
  roleGuard(["SUPERADMIN", "ADMIN"]),
  controller.getUserActivityReport
);
router.get(
  "/user-activity/pdf",
  authMiddleware,
  roleGuard(["SUPERADMIN", "ADMIN"]),
  controller.getUserActivityReportPDF
);

export default router;
