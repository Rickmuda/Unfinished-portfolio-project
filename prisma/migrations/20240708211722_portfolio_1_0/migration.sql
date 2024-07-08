/*
  Warnings:

  - You are about to drop the column `img` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `img` on the `wip` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `projects` DROP COLUMN `img`,
    ADD COLUMN `img1` VARCHAR(255) NULL,
    ADD COLUMN `img2` VARCHAR(255) NULL,
    ADD COLUMN `img3` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `wip` DROP COLUMN `img`,
    ADD COLUMN `img1` VARCHAR(255) NULL,
    ADD COLUMN `img2` VARCHAR(255) NULL,
    ADD COLUMN `img3` VARCHAR(255) NULL;
