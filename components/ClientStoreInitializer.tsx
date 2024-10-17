"use client";

import { useAccountStore } from "@/store/account.store";
import React, { useEffect } from "react";

type Props = {
  accounts: BalanceAccount[];
};

function ClientStoreInitializer({ accounts }: Props) {
  // console.log(accounts);
  useEffect(() => {
    if (accounts) {
      useAccountStore.setState({ accounts });
    }
  }, [accounts]);

  return null;
}

export default ClientStoreInitializer;
