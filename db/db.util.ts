// import { cache } from "react";
import { TransactionType, UserRoleEnum } from "@prisma/client";
import prisma from "./db";

export const getAccounts = async (companyId: number) => {
  const accounts: BalanceAccount[] = await prisma?.balanceAccount?.findMany({
    where: { companyId },
  });
  return accounts;
};

export const getTransactions = async (companyId: number) => {
  const transactions: Transaction[] = await prisma?.transaction?.findMany({
    where: { companyId },
    orderBy: [
      {
        date: "desc",
      },
    ],
  });
  return transactions;
};

export const getUserCompanies = async (userId: string) => {
  try {
    const companies = await prisma?.company.findMany({
      where: {
        users: {
          some: {
            userId,
          },
        },
      },
    });
    return companies;
  } catch (error) {
    console.log(error);
  }
};

export const createCompany = async (
  companyFormData: CompanyFormData,
  userId: string
) => {
  const users: { userId: string }[] = [{ userId }];
  const newCompany = await prisma?.company.create({
    data: {
      name: companyFormData.name,
      logo: companyFormData.logo,
      description: companyFormData.description,
      users: {
        create: users.map((user) => ({
          userId: user.userId,
          role: UserRoleEnum.COMPANY_ADMIN,
        })),
      },
    },
  });

  await createInitialBalances(newCompany.id, companyFormData);

  return newCompany;
};

const createInitialBalances = async (
  companyId: number,
  companyFormData: CompanyFormData
) => {
  try {
    const accountBalances: { name: AccountName; balance: number }[] = [
      { name: "INVESTMENT", balance: companyFormData.investment },
      { name: "ASSET", balance: companyFormData.assetsValue },
      { name: "REVENUE", balance: companyFormData.totalRevenue },
      { name: "EXPENDITURE", balance: companyFormData.totalExpenditure },
      { name: "LOAN", balance: companyFormData.loanBalance },
      { name: "BANK", balance: companyFormData.bankBalance },
      { name: "CASH", balance: companyFormData.cashBalance },
      {
        name: "MARGIN",
        balance:
          companyFormData.totalRevenue - companyFormData.totalExpenditure,
      },
    ];

    const createdBalances = await prisma.$transaction(
      accountBalances.map(({ name, balance }) =>
        prisma.balanceAccount.create({
          data: {
            name,
            companyId,
            balance,
          },
        })
      )
    );
    console.log("Balances created:", createdBalances);
    return createdBalances;
  } catch (error) {
    console.error("Error creating balances:", error);
  }
};
