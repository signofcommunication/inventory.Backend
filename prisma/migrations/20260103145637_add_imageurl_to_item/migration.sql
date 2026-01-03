/*
  Warnings:

  - Added the required column `imageUrl` to the `Item` table with a default empty string to allow migration on existing data.

*/
-- AlterTable
ALTER TABLE `item` ADD COLUMN `imageUrl` VARCHAR(191) NOT NULL DEFAULT '';
