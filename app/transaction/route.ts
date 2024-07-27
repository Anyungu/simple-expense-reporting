import prisma from "@/db/db";
import { AccountName } from "@prisma/client";

export async function POST(request: Request) {
  const body = await request.json();
  const { data, balance } = body;

  const [transaction] = await prisma.$transaction([
    prisma.transaction.create({
      data,
    }),
    prisma.account.update({
      where: {
        name: "BANK",
      },
      data: {
        balance: balance.bankBalance,
      },
    }),
    prisma.account.update({
      where: {
        name: "CASH",
      },
      data: {
        balance: balance.cashBalance,
      },
    }),
  ]);

  return Response.json(transaction);
}
