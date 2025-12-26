/*
  Warnings:

  - Added the required column `supplierId` to the `StockIn` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `stockin` ADD COLUMN `supplierId` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `stockout` ADD COLUMN `reason` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `StockIn` ADD CONSTRAINT `StockIn_supplierId_fkey` FOREIGN KEY (`supplierId`) REFERENCES `Supplier`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
