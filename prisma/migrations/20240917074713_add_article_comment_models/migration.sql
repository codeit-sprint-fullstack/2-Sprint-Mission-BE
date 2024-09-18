/*
  Warnings:

  - Added the required column `articleId` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "favoriteCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "favoriteUser" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "owner" TEXT;

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "articleId" TEXT NOT NULL,
ADD COLUMN     "owner" TEXT;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "favoriteUser" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
