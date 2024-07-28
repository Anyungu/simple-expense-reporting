import { useAccountStore } from "@/store/account.store";
import { TransactionType } from "@prisma/client";

export function getLiveBankTransaction(
  transactionType: TransactionType,
  amount: number
) {
  if (transactionType === "BANK_INVESTMENT") {
    return {
      bankBalance: amount,
      cashBalance: 0,
    };
  }

  if (transactionType === "BANK_TO_CASH") {
    return {
      bankBalance: -amount,
      cashBalance: amount,
    };
  }

  if (transactionType === "BANK_TO_EXPENSE") {
    return {
      bankBalance: -amount,
      cashBalance: 0,
    };
  }

  if (transactionType === "CASH_INVESTMENT") {
    return {
      bankBalance: 0,
      cashBalance: amount,
    };
  }

  if (transactionType === "CASH_TO_BANK") {
    return {
      bankBalance: amount,
      cashBalance: -amount,
    };
  }

  if (transactionType === "CASH_TO_EXPENSE") {
    return {
      bankBalance: 0,
      cashBalance: -amount,
    };
  }

  if (transactionType === "CLIENT_TO_BANK") {
    return {
      bankBalance: amount,
      cashBalance: 0,
    };
  }

  if (transactionType === "CLIENT_TO_CASH") {
    return {
      bankBalance: 0,
      cashBalance: amount,
    };
  }

  if (transactionType === "TRANSACTION_COST") {
    return {
      bankBalance: 0,
      cashBalance: -amount,
    };
  }
}
