/*
  Warnings:

  - You are about to drop the `Product_Image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product_Tag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product_Image" DROP CONSTRAINT "Product_Image_productId_fkey";

-- DropForeignKey
ALTER TABLE "Product_Tag" DROP CONSTRAINT "Product_Tag_productId_fkey";

-- DropTable
DROP TABLE "Product_Image";

-- DropTable
DROP TABLE "Product_Tag";
