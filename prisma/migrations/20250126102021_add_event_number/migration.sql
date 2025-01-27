/*
  Warnings:

  - Added the required column `event_number` to the `Registration` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Registration` ADD COLUMN `event_number` INTEGER NOT NULL;
