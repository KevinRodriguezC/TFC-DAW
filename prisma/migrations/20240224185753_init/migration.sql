/*
  Warnings:

  - You are about to drop the column `parent` on the `data` table. All the data in the column will be lost.
  - You are about to drop the column `parent` on the `directory` table. All the data in the column will be lost.
  - Added the required column `parentId` to the `Data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parentId` to the `Directory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `data` DROP COLUMN `parent`,
    ADD COLUMN `parentId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `directory` DROP COLUMN `parent`,
    ADD COLUMN `parentId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `UserOnWorkspaces` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `workspaceId` INTEGER NOT NULL,
    `role` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserOnWorkspaces` ADD CONSTRAINT `UserOnWorkspaces_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserOnWorkspaces` ADD CONSTRAINT `UserOnWorkspaces_workspaceId_fkey` FOREIGN KEY (`workspaceId`) REFERENCES `Workspace`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Directory` ADD CONSTRAINT `Directory_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `Workspace`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Data` ADD CONSTRAINT `Data_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `Directory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
