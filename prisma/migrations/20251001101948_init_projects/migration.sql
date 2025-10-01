/*
  Warnings:

  - You are about to drop the column `tech` on the `project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `project` DROP COLUMN `tech`,
    MODIFY `link` VARCHAR(191) NULL,
    MODIFY `github` VARCHAR(191) NULL;
