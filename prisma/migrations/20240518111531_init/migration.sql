-- DropForeignKey
ALTER TABLE `UserSocketsOnWorkspaces` DROP FOREIGN KEY `UserSocketsOnWorkspaces_userId_fkey`;

-- AlterTable
ALTER TABLE `UserSocketsOnWorkspaces` MODIFY `userId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `UserSocketsOnWorkspaces` ADD CONSTRAINT `UserSocketsOnWorkspaces_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
