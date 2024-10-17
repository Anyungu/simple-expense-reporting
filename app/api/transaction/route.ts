import prisma from "@/db/db";
import { AccountName } from "@prisma/client";
import Ably from "ably";

export async function POST(request: Request) {
  const body = await request.json();
  const { data, balanceChange } = body;

  const [
    ,
    updatedBankAccount,
    updatedCashAccount,
    updatedInvestmentAccount,
    updatedRevenueAccount,
    updatedExpenditureAccount,
  ] = await prisma.$transaction([
    prisma.transaction.create({
      data,
    }),
    prisma.balanceAccount.update({
      where: {
        name: AccountName.BANK,
      },
      data: {
        balance: {
          increment: balanceChange.bankBalance,
        },
      },
    }),
    prisma.balanceAccount.update({
      where: {
        name: AccountName.CASH,
      },
      data: {
        balance: {
          increment: balanceChange.cashBalance,
        },
      },
    }),
    prisma.balanceAccount.update({
      where: {
        name: AccountName.INVESTMENT,
      },
      data: {
        balance: {
          increment: balanceChange.investmentBalance,
        },
      },
    }),
    prisma.balanceAccount.update({
      where: {
        name: AccountName.REVENUE,
      },
      data: {
        balance: {
          increment: balanceChange.revenueBalance,
        },
      },
    }),
    prisma.balanceAccount.update({
      where: {
        name: AccountName.EXPENDITURE,
      },
      data: {
        balance: {
          increment: balanceChange.expenditureBalance,
        },
      },
    }),
  ]);

  const client = new Ably.Rest({ key: process.env.NEXT_PUBLIC_ABLY_API_KEY });
  const balanceChannel = client.channels.get("account-balance");

  await balanceChannel.publish("account-balance", {
    cash: updatedCashAccount.balance,
    bank: updatedBankAccount.balance,
    investment: updatedInvestmentAccount.balance,
    revenue: updatedRevenueAccount.balance,
    expenditure: updatedExpenditureAccount.balance,
  });

  return Response.json({ message: "Success" });
}

export async function PUT(request: Request) {
  const body = await request.json();
  const { id, transactionRolled, balanceChange } = body;

  const [
    ,
    updatedBankAccount,
    updatedCashAccount,
    updatedInvestmentAccount,
    updatedRevenueAccount,
    updatedExpenditureAccount,
  ] = await prisma.$transaction([
    prisma.transaction.update({
      where: { id },
      data: {
        transactionRolled,
      },
    }),
    prisma.balanceAccount.update({
      where: {
        name: AccountName.BANK,
      },
      data: {
        balance: {
          increment: balanceChange.bankBalance,
        },
      },
    }),
    prisma.balanceAccount.update({
      where: {
        name: AccountName.CASH,
      },
      data: {
        balance: {
          increment: balanceChange.cashBalance,
        },
      },
    }),

    prisma.balanceAccount.update({
      where: {
        name: AccountName.INVESTMENT,
      },
      data: {
        balance: {
          increment: balanceChange.cashBalance,
        },
      },
    }),
    prisma.balanceAccount.update({
      where: {
        name: AccountName.REVENUE,
      },
      data: {
        balance: {
          increment: balanceChange.revenueBalance,
        },
      },
    }),
    prisma.balanceAccount.update({
      where: {
        name: AccountName.EXPENDITURE,
      },
      data: {
        balance: {
          increment: balanceChange.expenditureBalance,
        },
      },
    }),

    prisma.balanceAccount.findUnique({
      where: {
        name: AccountName.BANK,
      },
    }),
    prisma.balanceAccount.findUnique({
      where: {
        name: AccountName.CASH,
      },
    }),
    prisma.balanceAccount.findUnique({
      where: {
        name: AccountName.INVESTMENT,
      },
    }),
    prisma.balanceAccount.findUnique({
      where: {
        name: AccountName.REVENUE,
      },
    }),
    prisma.balanceAccount.findUnique({
      where: {
        name: AccountName.EXPENDITURE,
      },
    }),
  ]);

  const client = new Ably.Rest({ key: process.env.NEXT_PUBLIC_ABLY_API_KEY });
  const balanceChannel = client.channels.get("account-balance");

  await balanceChannel.publish("account-balance", {
    cash: updatedCashAccount.balance,
    bank: updatedBankAccount.balance,
    investment: updatedInvestmentAccount.balance,
    revenue: updatedRevenueAccount.balance,
    expenditure: updatedExpenditureAccount.balance,
  });

  return Response.json({ message: "Success" });
}
