import { Router } from "express";

import itemRoutes from "./features/items/item.route";
import supplierRoutes from "./features/suppliers/supplier.route";
import loanRoutes from "./features/loans/loan.route";
import stockInRoutes from "./features/stock-in/stockIn.route";
import stockOutRoutes from "./features/stock-out/stockOut.route";
import reportRoutes from "./features/reports/report.route";
import authRoutes from "./modules/auth/auth.route";
import userRoutes from "./modules/user/user.route";
import { CategoryController } from "./modules/category/category.controller";

import { authMiddleware } from "./middlewares/auth.middleware";
import { roleGuard } from "./middlewares/role.middleware";
import { Role } from "@prisma/client";

const router = Router();

const categoryController = new CategoryController();

// Auth routes (no auth required)
router.use("/auth", authRoutes);

// User routes (only SUPERADMIN)
router.use("/users", authMiddleware, roleGuard([Role.SUPERADMIN]), userRoutes);

// Items (SUPERADMIN, ADMIN)
router.use(
  "/items",
  authMiddleware,
  roleGuard([Role.SUPERADMIN, Role.ADMIN, Role.PEMINJAM]),
  itemRoutes
);

// Suppliers (SUPERADMIN, ADMIN)
router.use(
  "/suppliers",
  authMiddleware,
  roleGuard([Role.SUPERADMIN, Role.ADMIN]),
  supplierRoutes
);

// Stock In (SUPERADMIN, ADMIN, PETUGAS_GUDANG)
router.use(
  "/stock-in",
  authMiddleware,
  roleGuard([Role.SUPERADMIN, Role.ADMIN, Role.PETUGAS_GUDANG]),
  stockInRoutes
);

// Stock Out (SUPERADMIN, ADMIN, PETUGAS_GUDANG)
router.use(
  "/stock-out",
  authMiddleware,
  roleGuard([Role.SUPERADMIN, Role.ADMIN, Role.PETUGAS_GUDANG]),
  stockOutRoutes
);

// Loans - Create (PEMINJAM), Approve (ADMIN, SUPERADMIN) - but since approve is part of loan routes, need to handle inside controller
// For simplicity, apply auth, and handle roles in controller
router.use("/loans", authMiddleware, loanRoutes);

// Reports (SUPERADMIN, ADMIN, PIMPINAN)
router.use(
  "/reports",
  authMiddleware,
  roleGuard([Role.SUPERADMIN, Role.ADMIN, Role.PIMPINAN]),
  reportRoutes
);

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

// Categories
router
  .route("/categories")
  .get(authMiddleware, categoryController.getAll.bind(categoryController))
  .post(
    authMiddleware,
    roleGuard([Role.SUPERADMIN, Role.ADMIN]),
    categoryController.create.bind(categoryController)
  );

router
  .route("/categories/:id")
  .get(authMiddleware, categoryController.getById.bind(categoryController))
  .put(
    authMiddleware,
    roleGuard([Role.SUPERADMIN, Role.ADMIN]),
    categoryController.update.bind(categoryController)
  )
  .delete(
    authMiddleware,
    roleGuard([Role.SUPERADMIN]),
    categoryController.remove.bind(categoryController)
  );

export default router;
