import { TransactionType } from "@prisma/client";

export function getLiveBalanceAfterTransaction(
  transactionType: TransactionType,
  amount: number
) {
  if (transactionType === "INVESTMENT_TO_CASH") {
    return {
      bankBalance: 0,
      cashBalance: amount,
      investmentBalance: amount,
      revenueBalance: 0,
      expenditureBalance: 0,
      marginBalance: 0,
      loanBalance: 0,
      assetBalance: 0,
    };
  }

  if (transactionType === "INVESTMENT_TO_BANK") {
    return {
      bankBalance: amount,
      cashBalance: 0,
      investmentBalance: amount,
      revenueBalance: 0,
      expenditureBalance: 0,
      marginBalance: 0,
      loanBalance: 0,
      assetBalance: 0,
    };
  }

  if (transactionType === "INVESTMENT_TO_ASSET") {
    return {
      bankBalance: 0,
      cashBalance: 0,
      investmentBalance: amount,
      revenueBalance: 0,
      expenditureBalance: 0,
      marginBalance: 0,
      loanBalance: 0,
      assetBalance: amount,
    };
  }

  if (transactionType === "LOAN_TO_BANK") {
    return {
      bankBalance: amount,
      cashBalance: 0,
      investmentBalance: 0,
      revenueBalance: 0,
      expenditureBalance: 0,
      marginBalance: 0,
      loanBalance: amount,
      assetBalance: 0,
    };
  }

  if (transactionType === "LOAN_TO_CASH") {
    return {
      bankBalance: 0,
      cashBalance: amount,
      investmentBalance: 0,
      revenueBalance: 0,
      expenditureBalance: 0,
      marginBalance: 0,
      loanBalance: amount,
      assetBalance: 0,
    };
  }

  if (transactionType === "LOAN_TO_ASSET") {
    return {
      bankBalance: 0,
      cashBalance: 0,
      investmentBalance: 0,
      revenueBalance: 0,
      expenditureBalance: 0,
      marginBalance: 0,
      loanBalance: amount,
      assetBalance: amount,
    };
  }

  if (transactionType === "CASH_TO_LOAN") {
    return {
      bankBalance: 0,
      cashBalance: -amount,
      investmentBalance: 0,
      revenueBalance: 0,
      expenditureBalance: 0,
      marginBalance: 0,
      loanBalance: -amount,
      assetBalance: 0,
    };
  }

  if (transactionType === "BANK_TO_LOAN") {
    return {
      bankBalance: -amount,
      cashBalance: 0,
      investmentBalance: 0,
      revenueBalance: 0,
      expenditureBalance: 0,
      marginBalance: 0,
      loanBalance: -amount,
      assetBalance: 0,
    };
  }

  if (transactionType === "CASH_TO_ASSET") {
    return {
      bankBalance: 0,
      cashBalance: -amount,
      investmentBalance: 0,
      revenueBalance: 0,
      expenditureBalance: 0,
      marginBalance: 0,
      loanBalance: 0,
      assetBalance: amount,
    };
  }

  if (transactionType === "BANK_TO_ASSET") {
    return {
      bankBalance: -amount,
      cashBalance: 0,
      investmentBalance: 0,
      revenueBalance: 0,
      expenditureBalance: 0,
      marginBalance: 0,
      loanBalance: 0,
      assetBalance: amount,
    };
  }

  if (transactionType === "ASSET_TO_BANK_SELL") {
    return {
      bankBalance: amount,
      cashBalance: 0,
      investmentBalance: 0,
      revenueBalance: amount,
      expenditureBalance: 0,
      marginBalance: amount,
      loanBalance: 0,
      assetBalance: -amount,
    };
  }

  if (transactionType === "ASSET_TO_CASH_SELL") {
    return {
      bankBalance: 0,
      cashBalance: amount,
      investmentBalance: 0,
      revenueBalance: amount,
      expenditureBalance: 0,
      marginBalance: amount,
      loanBalance: 0,
      assetBalance: -amount,
    };
  }

  if (transactionType === "ASSET_TO_BANK_HIRE") {
    return {
      bankBalance: amount,
      cashBalance: 0,
      investmentBalance: 0,
      revenueBalance: amount,
      expenditureBalance: 0,
      marginBalance: amount,
      loanBalance: 0,
      assetBalance: 0,
    };
  }

  if (transactionType === "ASSET_TO_CASH_HIRE") {
    return {
      bankBalance: 0,
      cashBalance: amount,
      investmentBalance: 0,
      revenueBalance: amount,
      expenditureBalance: 0,
      marginBalance: amount,
      loanBalance: 0,
      assetBalance: 0,
    };
  }

  if (transactionType === "BANK_TO_EXPENSE") {
    return {
      bankBalance: -amount,
      cashBalance: 0,
      investmentBalance: 0,
      revenueBalance: 0,
      expenditureBalance: amount,
      marginBalance: -amount,
      loanBalance: 0,
      assetBalance: 0,
    };
  }

  if (transactionType === "CASH_TO_EXPENSE") {
    return {
      bankBalance: 0,
      cashBalance: -amount,
      investmentBalance: 0,
      revenueBalance: 0,
      expenditureBalance: amount,
      marginBalance: -amount,
      loanBalance: 0,
      assetBalance: 0,
    };
  }

  if (transactionType === "LOAN_TO_EXPENSE") {
    return {
      bankBalance: 0,
      cashBalance: 0,
      investmentBalance: 0,
      revenueBalance: 0,
      expenditureBalance: amount,
      marginBalance: -amount,
      loanBalance: amount,
      assetBalance: 0,
    };
  }

  if (transactionType === "BANK_TO_CASH") {
    return {
      bankBalance: -amount,
      cashBalance: amount,
      investmentBalance: 0,
      revenueBalance: 0,
      expenditureBalance: 0,
      marginBalance: 0,
      loanBalance: 0,
      assetBalance: 0,
    };
  }

  if (transactionType === "CASH_TO_BANK") {
    return {
      bankBalance: amount,
      cashBalance: -amount,
      investmentBalance: 0,
      revenueBalance: 0,
      expenditureBalance: 0,
      marginBalance: 0,
      loanBalance: 0,
      assetBalance: 0,
    };
  }

  if (transactionType === "CLIENT_TO_BANK") {
    return {
      bankBalance: amount,
      cashBalance: 0,
      investmentBalance: 0,
      revenueBalance: amount,
      expenditureBalance: 0,
      marginBalance: amount,
      loanBalance: 0,
      assetBalance: 0,
    };
  }

  if (transactionType === "CLIENT_TO_CASH") {
    return {
      bankBalance: 0,
      cashBalance: amount,
      investmentBalance: 0,
      revenueBalance: amount,
      expenditureBalance: 0,
      marginBalance: amount,
      loanBalance: 0,
      assetBalance: 0,
    };
  }

  throw new Error(`Unknown transaction type: ${transactionType}`);
}
