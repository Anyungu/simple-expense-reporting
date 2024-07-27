import { useAccountStore } from "@/store/account.store";
import { TransactionType } from "@prisma/client";

const { accounts } = useAccountStore.getState();

export function getLiveBankTransaction(
  transactionType: TransactionType,
  amount: number
) {
  console.log(accounts);
  const bankAccount = accounts.find((account) => account.name === "BANK");
  const cashAccount = accounts.find((account) => account.name === "CASH");

  if (transactionType === "BANK_INVESTMENT") {
    return {
      bankBalance: (bankAccount?.balance ?? 0) + amount,
      cashBalance: cashAccount?.balance ?? 0,
    };
  }

  if (transactionType === "BANK_TO_CASH") {
    return {
      bankBalance: (bankAccount?.balance ?? 0) - amount,
      cashBalance: (cashAccount?.balance ?? 0) + amount,
    };
  }

  if (transactionType === "BANK_TO_EXPENSE") {
    return {
      bankBalance: (bankAccount?.balance ?? 0) - amount,
      cashBalance: cashAccount?.balance ?? 0,
    };
  }

  if (transactionType === "CASH_INVESTMENT") {
    return {
      bankBalance: bankAccount?.balance ?? 0,
      cashBalance: (cashAccount?.balance ?? 0) + amount,
    };
  }

  if (transactionType === "CASH_TO_BANK") {
    return {
      bankBalance: (bankAccount?.balance ?? 0) + amount,
      cashBalance: (cashAccount?.balance ?? 0) - amount,
    };
  }

  if (transactionType === "CASH_TO_EXPENSE") {
    return {
      bankBalance: bankAccount?.balance ?? 0,
      cashBalance: (cashAccount?.balance ?? 0) - amount,
    };
  }

  if (transactionType === "CLIENT_TO_BANK") {
    return {
      bankBalance: (bankAccount?.balance ?? 0) + amount,
      cashBalance: cashAccount?.balance ?? 0,
    };
  }

  if (transactionType === "CLIENT_TO_CASH") {
    return {
      bankBalance: bankAccount?.balance ?? 0,
      cashBalance: (cashAccount?.balance ?? 0) + amount,
    };
  }

  if (transactionType === "TRANSACTION_COST") {
    return {
      bankBalance: bankAccount?.balance ?? 0,
      cashBalance: (cashAccount?.balance ?? 0) - amount,
    };
  }
}
