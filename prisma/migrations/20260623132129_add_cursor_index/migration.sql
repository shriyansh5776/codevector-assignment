-- DropIndex
DROP INDEX "Product_category_idx";

-- CreateIndex
CREATE INDEX "Product_createdAt_id_idx" ON "Product"("createdAt", "id");
