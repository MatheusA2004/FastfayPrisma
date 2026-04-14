-- AlterTable: rename phones back to phone
ALTER TABLE `contacts` CHANGE `phones` `phone` VARCHAR(191) NOT NULL DEFAULT '';
