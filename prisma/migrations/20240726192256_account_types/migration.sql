/*
  Warnings:

  - Changed the type of `name` on the `Account` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "AccountName" AS ENUM ('BANK', 'CASH');

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "name",
ADD COLUMN     "name" "AccountName" NOT NULL;
