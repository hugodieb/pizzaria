/*
  Warnings:

  - You are about to drop the column `mount` on the `items` table. All the data in the column will be lost.
  - Added the required column `amount` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "items" DROP COLUMN "mount",
ADD COLUMN     "amount" INTEGER NOT NULL;
