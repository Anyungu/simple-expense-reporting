/*
  Warnings:

  - The values [ASSET_TO_BANK,ASSET_TO_CASH] on the enum `TransactionType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TransactionType_new" AS ENUM ('INVESTMENT_TO_CASH', 'INVESTMENT_TO_BANK', 'INVESTMENT_TO_ASSET', 'LOAN_TO_BANK', 'LOAN_TO_CASH', 'LOAN_TO_ASSET', 'CASH_TO_LOAN', 'BANK_TO_LOAN', 'CASH_TO_ASSET', 'BANK_TO_ASSET', 'ASSET_TO_BANK_SELL', 'ASSET_TO_CASH_SELL', 'ASSET_TO_BANK_HIRE', 'ASSET_TO_CASH_HIRE', 'BANK_TO_EXPENSE', 'CASH_TO_EXPENSE', 'LOAN_TO_EXPENSE', 'BANK_TO_CASH', 'CASH_TO_BANK', 'CLIENT_TO_BANK', 'CLIENT_TO_CASH');
ALTER TABLE "Transaction" ALTER COLUMN "type" TYPE "TransactionType_new" USING ("type"::text::"TransactionType_new");
ALTER TYPE "TransactionType" RENAME TO "TransactionType_old";
ALTER TYPE "TransactionType_new" RENAME TO "TransactionType";
DROP TYPE "TransactionType_old";
COMMIT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT;
