/*
  Warnings:

  - You are about to drop the column `phones` on the `contacts` table. All the data in the column will be lost.
  - Added the required column `phone` to the `contacts` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_contacts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "contacts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_contacts" ("email", "id", "name", "userId") SELECT "email", "id", "name", "userId" FROM "contacts";
DROP TABLE "contacts";
ALTER TABLE "new_contacts" RENAME TO "contacts";
CREATE UNIQUE INDEX "contacts_email_key" ON "contacts"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
