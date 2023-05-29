/*
  Warnings:

  - Added the required column `imageLink` to the `Livros` table without a default value. This is not possible if the table is not empty.
  - Added the required column `selfLink` to the `Livros` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Livros" ADD COLUMN     "imageLink" TEXT NOT NULL,
ADD COLUMN     "selfLink" TEXT NOT NULL;
