import prisma from "@/db/db";
import { AccountName } from "@prisma/client";
import Ably from "ably";

export async function POST(request: Request) {
  const body = await request.json();
  const { data, balanceChange } = body;

  const [transaction, updatedBankAccount, updatedCashAccount] =
    await prisma.$transaction([
      prisma.transaction.create({
        data,
      }),
      prisma.account.update({
        where: {
          name: AccountName.BANK,
        },
        data: {
          balance: {
            increment: balanceChange.bankBalance,
          },
        },
      }),
      prisma.account.update({
        where: {
          name: AccountName.CASH,
        },
        data: {
          balance: {
            increment: balanceChange.cashBalance,
          },
        },
      }),

      prisma.account.findUnique({
        where: {
          name: AccountName.BANK,
        },
      }),
      prisma.account.findUnique({
        where: {
          name: AccountName.CASH,
        },
      }),
    ]);

  const client = new Ably.Rest({ key: process.env.NEXT_PUBLIC_ABLY_API_KEY });
  const balanceChannel = client.channels.get("account-balance");

  await balanceChannel.publish("account-balance", {
    cash: updatedCashAccount.balance,
    bank: updatedBankAccount.balance,
  });

  return Response.json(transaction);
}
