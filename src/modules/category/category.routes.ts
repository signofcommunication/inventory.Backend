// filepath: c:\Users\yamad\OneDrive\Documents\Work\Skripsi - Stanley Tedjadinata\inventory.Backend\src\modules\category\category.routes.ts
import { Router } from "express";
import { CategoryController } from "./category.controller";

const router = Router();
const categoryController = new CategoryController();

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     description: Accessible by all logged-in users
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     description: Only SUPERADMIN and ADMIN
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Category name (required, unique)
 *               description:
 *                 type: string
 *                 description: Category description (optional)
 *             required:
 *               - name
 *     responses:
 *       201:
 *         description: Category created successfully
 */
router.get("/", categoryController.getAll.bind(categoryController));
router.post("/", categoryController.create.bind(categoryController));

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Get category by ID
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     description: Accessible by all logged-in users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Category retrieved successfully
 *       404:
 *         description: Category not found
 *   put:
 *     summary: Update category
 *     tags: [Categories]
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
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Category name (unique)
 *               description:
 *                 type: string
 *                 description: Category description
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       404:
 *         description: Category not found
 *       400:
 *         description: Bad request
 *   delete:
 *     summary: Delete category
 *     tags: [Categories]
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
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 *       400:
 *         description: Cannot delete category that is used by items
 */
router.get("/:id", categoryController.getById.bind(categoryController));
router.put("/:id", categoryController.update.bind(categoryController));
router.delete("/:id", categoryController.remove.bind(categoryController));

export default router;
