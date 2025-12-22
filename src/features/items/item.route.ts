import { Router } from "express";
import * as controller from "./item.controller";

const router = Router();

/**
 * @swagger
 * /items:
 *   get:
 *     summary: Get all items
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *     description: Only SUPERADMIN and ADMIN
 *     responses:
 *       200:
 *         description: Items retrieved successfully
 *   post:
 *     summary: Create a new item
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *     description: Only SUPERADMIN and ADMIN
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               kodeBarang:
 *                 type: string
 *               namaBarang:
 *                 type: string
 *               kategoriId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *                 default: 0
 *               unit:
 *                 type: string
 *               fotoBarang:
 *                 type: string
 *                 format: binary
 *                 description: Image file (optional)
 *     responses:
 *       201:
 *         description: Item created successfully
 */
router.get("/", controller.getAll);
router.post("/", controller.create);

/**
 * @swagger
 * /items/{id}:
 *   get:
 *     summary: Get item by ID
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *     description: Only SUPERADMIN and ADMIN
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Item retrieved successfully
 *   put:
 *     summary: Update item
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *     description: Only SUPERADMIN and ADMIN
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               namaBarang:
 *                 type: string
 *               kategoriId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *               unit:
 *                 type: string
 *               fotoBarang:
 *                 type: string
 *                 format: binary
 *                 description: Image file (optional)
 *     responses:
 *       200:
 *         description: Item updated successfully
 *   delete:
 *     summary: Delete item
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *     description: Only SUPERADMIN and ADMIN
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Item deleted successfully
 */
router.get("/:id", controller.getById);
router.put("/:id", ...controller.update);
router.delete("/:id", controller.remove);

export default router;
