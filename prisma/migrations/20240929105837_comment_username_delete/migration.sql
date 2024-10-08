/*
  Warnings:

  - You are about to drop the column `userName` on the `ArticleComment` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `ProductComment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ArticleComment" DROP COLUMN "userName";

-- AlterTable
ALTER TABLE "ProductComment" DROP COLUMN "userName";
