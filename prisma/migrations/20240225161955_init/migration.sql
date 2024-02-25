/*
  Warnings:

  - Added the required column `name` to the `Data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Directory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `visibility` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `visibility` to the `Workspace` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `data` ADD COLUMN `name` VARCHAR(191) NOT NULL,
    MODIFY `data` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `directory` ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `visibility` INTEGER NOT NULL,
    MODIFY `name` VARCHAR(191) NOT NULL,
    MODIFY `lastname` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `workspace` ADD COLUMN `visibility` INTEGER NOT NULL,
    MODIFY `description` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Attribute` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dataId` INTEGER NOT NULL,
    `type` INTEGER NOT NULL,
    `value` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Attribute` ADD CONSTRAINT `Attribute_dataId_fkey` FOREIGN KEY (`dataId`) REFERENCES `Data`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
