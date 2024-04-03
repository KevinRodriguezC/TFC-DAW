/*
  Warnings:

  - Added the required column `actionType` to the `Events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `events` ADD COLUMN `actionType` INTEGER NOT NULL;
