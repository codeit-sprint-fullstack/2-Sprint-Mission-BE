-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "favoriteCnt" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "images" TEXT[];
