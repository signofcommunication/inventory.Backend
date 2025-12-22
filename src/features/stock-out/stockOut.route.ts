import { Router } from "express";
import * as controller from "./stockOut.controller";

const router = Router();

/**
 * @swagger
 * /stock-out:
 *   get:
 *     summary: Get all stock outs
 *     tags: [Stock Out]
 *     security:
 *       - bearerAuth: []
 *     description: Only SUPERADMIN, ADMIN, and PETUGAS_GUDANG
 *     responses:
 *       200:
 *         description: Stock outs retrieved successfully
 *   post:
 *     summary: Create a new stock out
 *     tags: [Stock Out]
 *     security:
 *       - bearerAuth: []
 *     description: Only SUPERADMIN, ADMIN, and PETUGAS_GUDANG
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
 *     responses:
 *       201:
 *         description: Stock out created successfully
 */
router.get("/", controller.getAll);
router.post("/", controller.create);

export default router;
