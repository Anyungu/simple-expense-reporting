// import { cache } from "react";
import prisma from "./db";

export const getAccounts = async () => {
  const accounts: Account[] = await prisma?.account?.findMany();
  return accounts;
};

export const getTransactions = async () => {
  const transactions: Transaction[] = await prisma?.transaction?.findMany({
    orderBy: [
      {
        date: "desc",
      },
    ],
  });
  return transactions;
};
