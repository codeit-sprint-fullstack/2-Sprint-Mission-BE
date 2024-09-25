/*
  Warnings:

  - Added the required column `updatedAt` to the `ArticleCommnet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ProductComment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ArticleCommnet" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "ProductComment" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
