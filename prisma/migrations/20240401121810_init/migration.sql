-- CreateTable
CREATE TABLE `Events` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `type` INTEGER NOT NULL,
    `row` INTEGER NOT NULL,
    `workspaceId` INTEGER NULL,
    `userId` INTEGER NOT NULL,
    `name` VARCHAR(191) NULL,
    `value` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
