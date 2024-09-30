"use client";

import { useOpsStore } from "@/store/ops.store";
import React, { useState } from "react";

type Props = {};

const Header = ({}: Props) => {
  const { activeHeaderTab, updateActiveHeaderTab } = useOpsStore();
  return (
    <div className=" flex flex-row space-x-6 px-2 pt-6 bg-white shadow-2xl">
      <div
        className={`laptop:text-xl py-2 hover:cursor-pointer  ${
          activeHeaderTab === "accounts" ? "border-b border-black" : ""
        }`}
        onClick={() => {
          updateActiveHeaderTab("accounts");
        }}
      >
        Accounts
      </div>

      <div
        className={`laptop:text-xl py-2 hover:cursor-pointer  ${
          activeHeaderTab === "submit" ? "border-b border-black" : ""
        }`}
        onClick={() => {
          console.log("clicked");
          updateActiveHeaderTab("submit");
        }}
      >
        Entry
      </div>
      <div
        className={`laptop:text-xl py-2 hover:cursor-pointer   ${
          activeHeaderTab === "transactions" ? " border-b border-black" : ""
        }`}
        onClick={() => {
          updateActiveHeaderTab("transactions");
        }}
      >
        Transactions
      </div>
    </div>
  );
};

export default Header;
