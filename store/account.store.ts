import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type AccountStore = {
  accounts: Account[];
  // updateLiveAccountBalance: (index: number, amount: number) => void;
};

export const useAccountStore = create<AccountStore>()(
  persist(
    (set, get) => ({
      accounts: [],

      updateLiveAccountBalance: (index: number, amount: number) =>
        set((state) => {
          let accounts = state.accounts;
          let account = accounts[index];
          account = { ...account, balance: account.balance + amount };
          accounts[index] = account;
          return {
            ...state,
            accounts: [...accounts],
          };
        }),
    }),
    {
      name: "account-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
