type TransactionType =
  | "CASH_INVESTMENT"
  | "BANK_INVESTMENT"
  | "BANK_TO_EXPENSE"
  | "CASH_TO_EXPENSE"
  | "TRANSACTION_COST"
  | "BANK_TO_CASH"
  | "CASH_TO_BANK"
  | "CLIENT_TO_BANK"
  | "CLIENT_TO_CASH";

type AccountName = "BANK" | "CASH";
type Account = {
  id: number;
  name: AccountName;
  balance: number;
};

type Transaction = {
  id: number;
  date: Date;
  description: string;
  type: TransactionType;
  amount: number;
  reference: string;
  transactionRolled: boolean;
};
