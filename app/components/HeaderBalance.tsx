"use client";

import { getLiveBankTransaction } from "@/lib/store.util";
import { useAccountStore } from "@/store/account.store";
import { useTransactionStore } from "@/store/transaction.store";
import React from "react";

type Props = {};

const HeaderBalance = ({}: Props) => {
  const { accounts } = useAccountStore();
  const { amount, type } = useTransactionStore();

  const formatCurrency = (value: string) => {
    const numberValue = parseFloat(value.replace(/[^0-9.-]+/g, ""));
    if (isNaN(numberValue)) {
      return "Kes. 0.00";
    }
    return `Kes. ${numberValue.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
  };

  return accounts?.map((account, idx) => (
    <div key={idx} className=" flex flex-row gap-2 items-end">
      <p className=" text-xl lowercase">{account?.name}</p>
      <p className=" text-2xl font-extrabold">
        {formatCurrency(
          `${
            account?.name === "CASH"
              ? getLiveBankTransaction(type, amount)?.cashBalance
              : getLiveBankTransaction(type, amount)?.bankBalance
          }`
        )}
      </p>
    </div>
  ));
};
export default HeaderBalance;
