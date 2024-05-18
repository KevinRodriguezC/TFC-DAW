-- CreateTable
CREATE TABLE `UserSocketsOnWorkspaces` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `workspaceId` INTEGER NOT NULL,
    `randomNameId` INTEGER NULL,
    `socketId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserSocketsOnWorkspaces` ADD CONSTRAINT `UserSocketsOnWorkspaces_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserSocketsOnWorkspaces` ADD CONSTRAINT `UserSocketsOnWorkspaces_workspaceId_fkey` FOREIGN KEY (`workspaceId`) REFERENCES `Workspace`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
