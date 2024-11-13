/*
  Warnings:

  - You are about to drop the column `favoriteCount` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `favoriteUser` on the `Article` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Article" DROP COLUMN "favoriteCount",
DROP COLUMN "favoriteUser",
ADD COLUMN     "likeCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "likeUser" TEXT[] DEFAULT ARRAY[]::TEXT[];
