import { Router } from "express";
import * as controller from "./report.controller";

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
router.get("/stock", controller.getStockReport);
router.get("/summary", controller.getSummary);

export default router;
