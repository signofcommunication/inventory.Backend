import { Router } from "express";
import * as controller from "./stockIn.controller";

const router = Router();

/**
 * @swagger
 * /stock-in:
 *   get:
 *     summary: Get all stock ins
 *     tags: [Stock In]
 *     security:
 *       - bearerAuth: []
 *     description: Only SUPERADMIN, ADMIN, and PETUGAS_GUDANG
 *     responses:
 *       200:
 *         description: Stock ins retrieved successfully
 *   post:
 *     summary: Create a new stock in
 *     tags: [Stock In]
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
 *         description: Stock in created successfully
 */
router.get("/", controller.getAll);
router.post("/", controller.create);

export default router;
