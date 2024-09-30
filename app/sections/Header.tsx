"use client";

import { useOpsStore } from "@/store/ops.store";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React, { useState } from "react";

type Props = {};

const Header = ({}: Props) => {
  const { activeHeaderTab, updateActiveHeaderTab } = useOpsStore();
  return (
    <div className=" flex flex-row justify-between pt-6 px-2 bg-white shadow-2xl">
      <div className="flex flex-row space-x-6">
        <div className="py-2">
          <Image
            src={"/logo/file.jpg"}
            width={40}
            height={40}
            alt="Picture of the author"
          />
        </div>
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
      <div>
        <UserButton />
      </div>
    </div>
  );
};

export default Header;
