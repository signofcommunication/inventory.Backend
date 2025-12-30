import { Router } from "express";
import { BrandController } from "./brand.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { roleGuard } from "../../middlewares/role.middleware";

const router = Router();
const brandController = new BrandController();

router.post(
  "/",
  authMiddleware,
  roleGuard(["SUPERADMIN", "ADMIN"]),
  brandController.createBrand.bind(brandController)
);
router.get(
  "/",
  authMiddleware,
  roleGuard(["SUPERADMIN", "ADMIN", "PETUGAS_GUDANG", "PIMPINAN"]),
  brandController.getAllBrands.bind(brandController)
);
router.get(
  "/:id",
  authMiddleware,
  roleGuard(["SUPERADMIN", "ADMIN", "PETUGAS_GUDANG", "PIMPINAN"]),
  brandController.getBrandById.bind(brandController)
);
router.put(
  "/:id",
  authMiddleware,
  roleGuard(["SUPERADMIN", "ADMIN"]),
  brandController.updateBrand.bind(brandController)
);
router.delete(
  "/:id",
  authMiddleware,
  roleGuard(["SUPERADMIN"]),
  brandController.deleteBrand.bind(brandController)
);

export default router;
