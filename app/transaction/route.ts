import prisma from "@/db/db";
import { AccountName } from "@prisma/client";
import Ably from "ably";

export async function POST(request: Request) {
  const body = await request.json();
  const { data, balance } = body;

  const [transaction] = await prisma.$transaction([
    prisma.transaction.create({
      data,
    }),
    prisma.account.update({
      where: {
        name: AccountName.BANK,
      },
      data: {
        balance: balance.bankBalance,
      },
    }),
    prisma.account.update({
      where: {
        name: AccountName.CASH,
      },
      data: {
        balance: balance.cashBalance,
      },
    }),
  ]);

  const client = new Ably.Rest({ key: process.env.NEXT_PUBLIC_ABLY_API_KEY });
  const balanceChannel = client.channels.get("account-balance");

  await balanceChannel.publish("account-balance", {
    cash: balance.cashBalance,
    bank: balance.bankBalance,
  });

  return Response.json(transaction);
}
