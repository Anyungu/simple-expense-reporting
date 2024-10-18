"use client";

import { useOpsStore } from "@/store/ops.store";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";

type Props = {};

const Header = ({}: Props) => {
  const { data: session } = useSession();
  const { activeHeaderTab, updateActiveHeaderTab } = useOpsStore();

  if (!session?.user.companies || session.user.companies.length === 0) {
    return null;
  }
  return (
    <div className=" flex flex-row justify-between pt-4 px-2 bg-[#FFFFFF]  shadow-2xl">
      <div className="flex flex-row space-x-6">
        <div className="">
          <Image
            src={"/logo/file.jpg"}
            width={50}
            height={50}
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
      <div className=" py-2">
        <Image
          className=" rounded-full"
          width={40}
          height={40}
          src={session?.user?.image}
          alt=""
        />
      </div>
    </div>
  );
};

export default Header;
