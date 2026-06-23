/*
  Warnings:

  - Changed the type of `category` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('ELECTRONICS', 'BOOKS', 'FASHION', 'SPORTS', 'HOME', 'BEAUTY');

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "category",
ADD COLUMN     "category" "Category" NOT NULL;

-- CreateIndex
CREATE INDEX "Product_category_idx" ON "Product"("category");
