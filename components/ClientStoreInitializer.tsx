"use client";

import { useAccountStore } from "@/store/account.store";
import React, { useEffect } from "react";

type Props = {
  accounts: Account[];
};

function ClientStoreInitializer({ accounts }: Props) {
  useEffect(() => {
    if (accounts) {
      useAccountStore.setState({ accounts });
    }
  }, [accounts]);

  return null;
}

export default ClientStoreInitializer;
