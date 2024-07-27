import React from "react";
import HeaderBalance from "./HeaderBalance";
import { getAccounts } from "@/db/db.util";
import ClientStoreInitializer from "@/components/ClientStoreInitializer";

export const revalidate = 0;

type Props = {};

const Header = async ({}: Props) => {
  const accounts = await getAccounts();
  <ClientStoreInitializer accounts={accounts} />;
  return (
    <header className=" sticky top-2 bg-red flex flex-row justify-around py-4">
      <HeaderBalance />
    </header>
  );
};

export default Header;
