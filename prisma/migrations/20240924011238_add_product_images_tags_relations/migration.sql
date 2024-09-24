/*
  Warnings:

  - You are about to drop the column `images` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_ownerId_fkey";

-- AlterTable
ALTER TABLE "Article" ALTER COLUMN "ownerId" DROP NOT NULL,
ALTER COLUMN "ownerId" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "ownerId" DROP NOT NULL,
ALTER COLUMN "ownerId" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "images",
DROP COLUMN "tags";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "image" DROP DEFAULT;

-- CreateTable
CREATE TABLE "Product_Tag" (
    "id" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "Product_Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product_Image" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "Product_Image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Product_Tag" ADD CONSTRAINT "Product_Tag_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_Image" ADD CONSTRAINT "Product_Image_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
