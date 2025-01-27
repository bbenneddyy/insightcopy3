/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `Registration` ADD COLUMN `archive` BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE `User`;
