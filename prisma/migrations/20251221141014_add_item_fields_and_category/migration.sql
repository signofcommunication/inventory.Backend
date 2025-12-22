/*
  Warnings:

  - You are about to drop the column `name` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `stock` on the `item` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[kodeBarang]` on the table `Item` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `kategoriId` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kodeBarang` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `namaBarang` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Insert default category
INSERT INTO `Category` (`name`) VALUES ('Default Category');

-- Update existing items with dummy data
UPDATE `item` SET `name` = CONCAT('Old Item ', `id`) WHERE `name` IS NOT NULL;
UPDATE `item` SET `stock` = 0 WHERE `stock` IS NULL;

-- AlterTable
ALTER TABLE `item` DROP COLUMN `name`,
    DROP COLUMN `stock`,
    ADD COLUMN `fotoBarang` VARCHAR(191) NULL,
    ADD COLUMN `kategoriId` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `kodeBarang` VARCHAR(191) NOT NULL,
    ADD COLUMN `namaBarang` VARCHAR(191) NOT NULL,
    ADD COLUMN `quantity` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `unit` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- Update kodeBarang and namaBarang from old data
UPDATE `item` SET `kodeBarang` = CONCAT('ITEM', `id`), `namaBarang` = 'Old Item', `unit` = 'pcs' WHERE `kodeBarang` = '';

-- CreateIndex
CREATE UNIQUE INDEX `Item_kodeBarang_key` ON `Item`(`kodeBarang`);

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_kategoriId_fkey` FOREIGN KEY (`kategoriId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
