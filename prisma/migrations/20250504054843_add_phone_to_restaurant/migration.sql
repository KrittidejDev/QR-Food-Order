/*
  Warnings:

  - Added the required column `qr_code_link` to the `Table` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Table" ADD COLUMN     "qr_code_link" TEXT NOT NULL;
