-- AlterTable: recreate contacts with userId and phones column
ALTER TABLE `contacts` ADD COLUMN `phones` VARCHAR(191) NOT NULL DEFAULT '',
                       ADD COLUMN `userId` VARCHAR(191) NOT NULL DEFAULT '';

-- AddForeignKey
ALTER TABLE `contacts` ADD CONSTRAINT `contacts_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
