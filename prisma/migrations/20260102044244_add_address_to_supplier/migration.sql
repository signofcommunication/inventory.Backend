-- AlterTable
ALTER TABLE `brand` ALTER COLUMN `updatedAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `category` ALTER COLUMN `updatedAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `supplier` ADD COLUMN `address` VARCHAR(191) NULL;
