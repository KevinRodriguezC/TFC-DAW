/*
  Warnings:

  - Added the required column `deleted` to the `Directory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Directory` ADD COLUMN `deleted` BOOLEAN NOT NULL;
