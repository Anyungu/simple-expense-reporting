type TransactionType =
  | "INVESTMENT_TO_CASH"
  | "INVESTMENT_TO_BANK"
  | "INVESTMENT_TO_ASSET"
  | "LOAN_TO_BANK"
  | "LOAN_TO_CASH"
  | "LOAN_TO_ASSET"
  | "CASH_TO_LOAN"
  | "BANK_TO_LOAN"
  | "CASH_TO_ASSET"
  | "BANK_TO_ASSET"
  | "ASSET_TO_BANK_SELL"
  | "ASSET_TO_CASH_SELL"
  | "ASSET_TO_BANK_HIRE"
  | "ASSET_TO_CASH_HIRE"
  | "BANK_TO_EXPENSE"
  | "CASH_TO_EXPENSE"
  | "LOAN_TO_EXPENSE"
  | "BANK_TO_CASH"
  | "CASH_TO_BANK"
  | "CLIENT_TO_BANK"
  | "CLIENT_TO_CASH";

type AccountName =
  | "BANK"
  | "CASH"
  | "INVESTMENT"
  | "REVENUE"
  | "EXPENDITURE"
  | "MARGIN"
  | "LOAN"
  | "ASSET";

type BalanceAccount = {
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

type HeaderTab = "accounts" | "transactions" | "submit";

type Company = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  description: string;
  logo: string;
};

type CompanyFormData = {
  name: string;
  logo: string;
  description: string;
  investment: number;
  assetsValue: number;
  totalRevenue: number;
  totalExpenditure: number;
  loanBalance: number;
  bankBalance: number;
  cashBalance: number;
};

type StepConfig = {
  name: string;
  field: keyof CompanyFormData;
  type: "text" | "number" | "textarea" | "custom";
  question: string;
};
