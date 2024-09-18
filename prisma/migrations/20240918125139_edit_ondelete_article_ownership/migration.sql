-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_ownerId_fkey";

-- AlterTable
ALTER TABLE "Article" ALTER COLUMN "ownerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
