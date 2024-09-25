-- DropIndex
DROP INDEX "ArticleComment_updatedAt_idx";

-- DropIndex
DROP INDEX "ProductComment_updatedAt_idx";

-- CreateIndex
CREATE INDEX "ArticleComment_commenterId_updatedAt_idx" ON "ArticleComment"("commenterId", "updatedAt" DESC);

-- CreateIndex
CREATE INDEX "ProductComment_commenterId_updatedAt_idx" ON "ProductComment"("commenterId", "updatedAt" DESC);
