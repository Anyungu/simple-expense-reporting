"use client";

import { AblyProvider, ChannelProvider, useChannel } from "ably/react";
import React, { useState } from "react";
import Ably from "ably";
import { useRouter } from "next/navigation";

type Props = {
  accounts: Account[];
};

const HeaderBalance = ({ accounts }: Props) => {
  const client = new Ably.Realtime({
    key: process.env.NEXT_PUBLIC_ABLY_API_KEY,
    // clientId: "<client-ID>",
  });

  return (
    <AblyProvider client={client}>
      <ChannelProvider channelName="account-balance">
        <ActualBalance accounts={accounts} />
      </ChannelProvider>
    </AblyProvider>
  );
};

const ActualBalance = ({ accounts }: Props) => {
  const router = useRouter();

  const initialBankBalance = accounts?.find(
    (account) => account.name === "BANK"
  )?.balance;
  const initialCashBalance = accounts?.find(
    (account) => account.name === "CASH"
  )?.balance;

  const initialInvestmentBalance = accounts?.find(
    (account) => account.name === "INVESTMENT"
  )?.balance;

  const [bankBalance, setBankbalance] = useState<number | undefined>(
    initialBankBalance
  );
  const [cashBalance, setCashbalance] = useState<number | undefined>(
    initialCashBalance
  );
  const [investmentBalance, setInvestmentbalance] = useState<number | undefined>(
    initialInvestmentBalance
  );

  useChannel("account-balance", (message) => {
    // console.log(message);
    setBankbalance(message?.data?.bank);
    setCashbalance(message?.data?.cash);
    setInvestmentbalance(message?.data?.investment);
    router.refresh();
  });

  const formatCurrency = (value: string) => {
    const numberValue = parseFloat(value.replace(/[^0-9.-]+/g, ""));
    if (isNaN(numberValue)) {
      return "Kes. 0.00";
    }
    return `Kes. ${numberValue.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
  };

  return (
    <>
      <div className=" flex flex-col tabs:flex-row gap-1 tabs:gap-2 items-start tabs:items-end">
        <p className=" text-lg tabs:text-xl lowercase">investment</p>
        <p className=" text-xl tabs:text-2xl font-bold tabs:font-extrabold">
          {formatCurrency(`${investmentBalance}`)}
        </p>
      </div>
      <div className=" flex flex-col tabs:flex-row gap-1 tabs:gap-2 items-start tabs:items-end">
        <p className=" text-lg tabs:text-xl lowercase">cash</p>
        <p className=" text-xl tabs:text-2xl font-bold tabs:font-extrabold">
          {formatCurrency(`${cashBalance}`)}
        </p>
      </div>

      <div className=" flex flex-col tabs:flex-row gap-1 tabs:gap-2 items-start tabs:items-end">
        <p className=" text-lg tabs:text-xl lowercase">bank</p>
        <p className=" text-xl tabs:text-2xl font-bold tabs:font-extrabold">
          {formatCurrency(`${bankBalance}`)}
        </p>
      </div>
    </>
  );
};
export default HeaderBalance;
