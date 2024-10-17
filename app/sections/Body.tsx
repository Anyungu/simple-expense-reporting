"use client";

import { useOpsStore } from "@/store/ops.store";
import React from "react";
import CardsSection from "./CardsSection";
import FormEntrySection from "./FormEntrySection";
import TransactionsSection from "./TransactionsSection";
import { useSession } from "next-auth/react";

import { motion } from "framer-motion";
import { useState } from "react";
import CompanyStepperForm from "../components/CompanyStepperForm";
import GeneralSkeleton from "../components/GeneralSkeleton";

type Props = {
  accounts: BalanceAccount[];
  transactions: Transaction[];
};

const Body = ({ accounts, transactions }: Props) => {
  const { data: session, status } = useSession();
  const { activeHeaderTab } = useOpsStore();

  console.log(session);

  if (status === "loading") {
    return (
      <div className=" px-8 py-12 flex items-center justify-center">
        <GeneralSkeleton />
      </div>
    );
  }

  if (!session?.user?.companies || session?.user?.companies.length === 0) {
    return (
      <div className=" px-4 laptop:px-8 py-12 flex items-center justify-center">
        {" "}
        <CompanyStepperForm />
      </div>
    );
  }

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
