-- CreateTable
CREATE TABLE "ProductFavorite" (
    "userId" INTEGER NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "ProductFavorite_pkey" PRIMARY KEY ("userId","productId")
);

-- CreateTable
CREATE TABLE "ArticleFavorite" (
    "userId" INTEGER NOT NULL,
    "articleId" TEXT NOT NULL,

    CONSTRAINT "ArticleFavorite_pkey" PRIMARY KEY ("userId","articleId")
);

-- AddForeignKey
ALTER TABLE "ProductFavorite" ADD CONSTRAINT "ProductFavorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductFavorite" ADD CONSTRAINT "ProductFavorite_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleFavorite" ADD CONSTRAINT "ArticleFavorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleFavorite" ADD CONSTRAINT "ArticleFavorite_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;
