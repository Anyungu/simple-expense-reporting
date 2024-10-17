/*
  Warnings:

  - The values [CASH_INVESTMENT,BANK_INVESTMENT,TRANSACTION_COST] on the enum `TransactionType` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[companyId,name]` on the table `BalanceAccount` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `companyId` to the `BalanceAccount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "AccountName" ADD VALUE 'LOAN';
ALTER TYPE "AccountName" ADD VALUE 'ASSET';
ALTER TYPE "AccountName" ADD VALUE 'MARGIN';

-- AlterEnum
BEGIN;
CREATE TYPE "TransactionType_new" AS ENUM ('INVESTMENT_TO_CASH', 'INVESTMENT_TO_BANK', 'INVESTMENT_TO_ASSET', 'LOAN_TO_BANK', 'LOAN_TO_CASH', 'LOAN_TO_ASSET', 'CASH_TO_LOAN', 'BANK_TO_LOAN', 'CASH_TO_ASSET', 'BANK_TO_ASSET', 'ASSET_TO_BANK', 'ASSET_TO_CASH', 'BANK_TO_EXPENSE', 'CASH_TO_EXPENSE', 'LOAN_TO_EXPENSE', 'BANK_TO_CASH', 'CASH_TO_BANK', 'CLIENT_TO_BANK', 'CLIENT_TO_CASH');
ALTER TABLE "Transaction" ALTER COLUMN "type" TYPE "TransactionType_new" USING ("type"::text::"TransactionType_new");
ALTER TYPE "TransactionType" RENAME TO "TransactionType_old";
ALTER TYPE "TransactionType_new" RENAME TO "TransactionType";
DROP TYPE "TransactionType_old";
COMMIT;

-- AlterTable
ALTER TABLE "BalanceAccount" ADD COLUMN     "companyId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "companyId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Asset" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "description" VARCHAR(255),
    "amount" INTEGER NOT NULL DEFAULT 0,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "Asset_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Asset_companyId_idx" ON "Asset"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "BalanceAccount_companyId_name_key" ON "BalanceAccount"("companyId", "name");

-- CreateIndex
CREATE INDEX "Transaction_companyId_idx" ON "Transaction"("companyId");

-- AddForeignKey
ALTER TABLE "BalanceAccount" ADD CONSTRAINT "BalanceAccount_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
