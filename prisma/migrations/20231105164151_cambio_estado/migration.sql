/*
  Warnings:

  - You are about to drop the column `despachada` on the `orden` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `orden` DROP COLUMN `despachada`,
    ADD COLUMN `estado` BOOLEAN NOT NULL DEFAULT false;
