import React from "react";
import HeaderBalance from "./HeaderBalance";
import { getAccounts } from "@/db/db.util";

export const revalidate = 0;

type Props = {};

const Header = async ({}: Props) => {
  const accounts = await getAccounts();
  // console.log(accounts);
  return (
    <>
      <header className=" sticky top-2 bg-red flex flex-row justify-around py-4">
        <HeaderBalance accounts={accounts} />
      </header>
    </>
  );
};

export default Header;
