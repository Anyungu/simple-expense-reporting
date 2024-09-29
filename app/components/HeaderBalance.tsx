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

  const initialRevenueBalance = accounts?.find(
    (account) => account.name === "REVENUE"
  )?.balance;

  const initialExpenditureBalance = accounts?.find(
    (account) => account.name === "EXPENDITURE"
  )?.balance;

  const [bankBalance, setBankbalance] = useState<number | undefined>(
    initialBankBalance
  );
  const [cashBalance, setCashbalance] = useState<number | undefined>(
    initialCashBalance
  );
  const [investmentBalance, setInvestmentbalance] = useState<
    number | undefined
  >(initialInvestmentBalance);

  const [revenueBalance, setRevenuebalance] = useState<number | undefined>(
    initialRevenueBalance
  );

  const [expenditureBalance, setExpenditurebalance] = useState<
    number | undefined
  >(initialExpenditureBalance);

  useChannel("account-balance", (message) => {
    // console.log(message);
    setBankbalance(message?.data?.bank);
    setCashbalance(message?.data?.cash);
    setInvestmentbalance(message?.data?.investment);
    setRevenuebalance(message?.data?.revenue);
    setExpenditurebalance(message?.data?.expenditure);
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
    <div className="flex flex-col items-center w-full px-4 sm:px-12">
      <div className="flex flex-col items-center mb-6 sm:mb-4">
        <p className="text-lg sm:text-xl lowercase">investment</p>
        <p className="text-xl sm:text-2xl font-bold">
          {formatCurrency(`${investmentBalance ?? 0}`)}
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-4 w-full mb-6 sm:mb-4">
        <div className="flex flex-col items-center">
          <p className="text-lg sm:text-xl lowercase">cash</p>
          <p className="text-xl sm:text-2xl font-bold">
            {formatCurrency(`${cashBalance ?? 0}`)}
          </p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-lg sm:text-xl lowercase">bank</p>
          <p className="text-xl sm:text-2xl font-bold">
            {formatCurrency(`${bankBalance ?? 0}`)}
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
        <div className="flex flex-col items-center">
          <p className="text-lg sm:text-xl lowercase">revenue</p>
          <p className="text-xl sm:text-2xl font-bold">
            {formatCurrency(`${revenueBalance ?? 0}`)}
          </p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-lg sm:text-xl lowercase">expenditure</p>
          <p className="text-xl sm:text-2xl font-bold">
            {formatCurrency(`${expenditureBalance ?? 0}`)}
          </p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-lg sm:text-xl lowercase">profit</p>
          <p className="text-xl sm:text-2xl font-bold">
            {formatCurrency(`${(revenueBalance ?? 0) - (expenditureBalance ?? 0)}`)}
          </p>
        </div>
      </div>
    </div>
  );
};
export default HeaderBalance;
