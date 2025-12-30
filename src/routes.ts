import { Router } from "express";

import itemRoutes from "./features/items/item.route";
import supplierRoutes from "./features/suppliers/supplier.route";
import loanRoutes from "./features/loans/loan.route";
import stockInRoutes from "./features/stock-in/stockIn.route";
import stockOutRoutes from "./features/stock-out/stockOut.route";
import reportRoutes from "./features/reports/report.route";
import authRoutes from "./modules/auth/auth.route";
import userRoutes from "./modules/user/user.route";
import brandRoutes from "./modules/brand/brand.route";
import categoryRoutes from "./modules/category/category.routes";

import { authMiddleware } from "./middlewares/auth.middleware";
import { roleGuard } from "./middlewares/role.middleware";
import { Role } from "@prisma/client";

const router = Router();

// Auth routes (no auth required)
router.use("/auth", authRoutes);

// User routes (only SUPERADMIN)
router.use("/users", authMiddleware, roleGuard([Role.SUPERADMIN]), userRoutes);

// Brand routes
router.use("/brands", authMiddleware, brandRoutes);

// Category routes
router.use("/categories", authMiddleware, categoryRoutes);

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

export default router;
