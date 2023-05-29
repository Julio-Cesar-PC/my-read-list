/*
  Warnings:

  - A unique constraint covering the columns `[googleId]` on the table `Livros` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `googleId` to the `Livros` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Livros" ADD COLUMN     "googleId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Livros_googleId_key" ON "Livros"("googleId");
