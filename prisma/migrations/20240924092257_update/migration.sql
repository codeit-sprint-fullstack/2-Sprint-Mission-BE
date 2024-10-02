/*
  Warnings:

  - Made the column `articleId` on table `ArticleComment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ownerUserId` on table `ArticleComment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `productId` on table `ProductComment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ownerUserId` on table `ProductComment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ArticleComment" ALTER COLUMN "articleId" SET NOT NULL,
ALTER COLUMN "ownerUserId" SET NOT NULL;

-- AlterTable
ALTER TABLE "ProductComment" ALTER COLUMN "productId" SET NOT NULL,
ALTER COLUMN "ownerUserId" SET NOT NULL;
