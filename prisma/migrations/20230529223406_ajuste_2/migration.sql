/*
  Warnings:

  - You are about to drop the column `ano` on the `Livros` table. All the data in the column will be lost.
  - Added the required column `dataPublicacao` to the `Livros` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Livros" DROP COLUMN "ano",
ADD COLUMN     "dataPublicacao" TIMESTAMP(3) NOT NULL;
