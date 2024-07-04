/*
  Warnings:

  - Added the required column `cover` to the `projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `projects` ADD COLUMN `cover` VARCHAR(255) NOT NULL;

-- CreateTable
CREATE TABLE `wip` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `category` VARCHAR(100) NOT NULL,
    `description` TEXT NOT NULL,
    `img` VARCHAR(255) NOT NULL,
    `cover` VARCHAR(255) NOT NULL,
    `gif` VARCHAR(255) NOT NULL,
    `path` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
