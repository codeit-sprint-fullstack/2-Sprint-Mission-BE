/*
  Warnings:

  - You are about to drop the column `favoriteCount` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "favoriteCount",
ADD COLUMN     "likeCount" INTEGER NOT NULL DEFAULT 0;
