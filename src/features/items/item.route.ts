import { Router } from "express";
import { ItemController } from "./item.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { roleGuard } from "../../middlewares/role.middleware";

const router = Router();
const itemController = new ItemController();

/**
 * @swagger
 * /items:
 *   get:
 *     summary: Get all items
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *     description: Accessible by SUPERADMIN, ADMIN, PETUGAS_GUDANG, and PIMPINAN
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
router.post(
  "/",
  authMiddleware,
  roleGuard(["SUPERADMIN", "ADMIN"]),
  itemController.createItem.bind(itemController)
);
router.get(
  "/",
  authMiddleware,
  roleGuard(["SUPERADMIN", "ADMIN", "PETUGAS_GUDANG", "PIMPINAN"]),
  itemController.getAllItems.bind(itemController)
);

/**
 * @swagger
 * /items/{id}:
 *   get:
 *     summary: Get item by ID
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *     description: Accessible by SUPERADMIN, ADMIN, PETUGAS_GUDANG, and PIMPINAN
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
 *     description: Only SUPERADMIN
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
router.get(
  "/:id",
  authMiddleware,
  roleGuard(["SUPERADMIN", "ADMIN", "PETUGAS_GUDANG", "PIMPINAN"]),
  itemController.getItemById.bind(itemController)
);
router.put(
  "/:id",
  authMiddleware,
  roleGuard(["SUPERADMIN", "ADMIN"]),
  itemController.updateItem.bind(itemController)
);
router.delete(
  "/:id",
  authMiddleware,
  roleGuard(["SUPERADMIN"]),
  itemController.deleteItem.bind(itemController)
);

export default router;
