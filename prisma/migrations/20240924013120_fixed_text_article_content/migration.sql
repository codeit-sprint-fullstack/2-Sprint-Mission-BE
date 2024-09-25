/*
  Warnings:

  - You are about to drop the column `contoent` on the `Article` table. All the data in the column will be lost.
  - Added the required column `content` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `favoriteCount` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Article" DROP COLUMN "contoent",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "favoriteCount" INTEGER NOT NULL,
ADD COLUMN     "images" TEXT[];
