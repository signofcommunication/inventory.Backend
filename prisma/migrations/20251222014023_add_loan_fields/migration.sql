-- AlterTable
ALTER TABLE `loan` ADD COLUMN `borrowerName` VARCHAR(191) NULL,
    ADD COLUMN `endDate` DATETIME(3) NULL,
    ADD COLUMN `purpose` VARCHAR(191) NULL,
    ADD COLUMN `rejectionReason` VARCHAR(191) NULL,
    ADD COLUMN `startDate` DATETIME(3) NULL;
