"use client";

import { useOpsStore } from "@/store/ops.store";
import React from "react";
import CardsSection from "./CardsSection";
import FormEntrySection from "./FormEntrySection";
import TransactionsSection from "./TransactionsSection";

type Props = {
  accounts: Account[];
  transactions: Transaction[];
};

const Body = ({ accounts, transactions }: Props) => {
  const { activeHeaderTab } = useOpsStore();

  return (
    <div className=" px-8 py-12">
      {activeHeaderTab === "accounts" ? (
        <CardsSection accounts={accounts} />
      ) : activeHeaderTab === "submit" ? (
        <FormEntrySection />
      ) : (
        <TransactionsSection transactions={transactions} />
      )}
    </div>
  );
};

export default Body;
