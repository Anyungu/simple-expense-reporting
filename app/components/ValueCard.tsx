import { formatCurrency } from "@/lib/utils";
import React from "react";

type Props = {
  account: Account;
};

const ValueCard = ({ account }: Props) => {
  return (
    <div className=" rounded-2xl px-4 py-4 bg-white flex flex-col">
      {/* upper */}
      <div className="flex flex-row justify-end py-4">
        <div className=" text-2xl font-semibold">
          {" "}
          {formatCurrency(account.balance.toString())}
        </div>
      </div>

      <div className=" px-4">
        <hr />
      </div>

      {/* lower */}
      <div className=" py-4 text-gray-500">{account?.name}</div>
    </div>
  );
};

export default ValueCard;
