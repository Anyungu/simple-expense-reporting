import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type TransactionStore = {
  type: TransactionType;
  name: string;
  reference: string;
  amount: number;
  date: Date;
  updateTransaction: (updateData: Partial<TransactionStore>) => void;
};

export const useTransactionStore = create<TransactionStore>()(
  persist(
    (set, get) => ({
      type: "CASH_TO_EXPENSE",
      name: "",
      reference: "",
      amount: 0,
      date: new Date(Date.now()),

      updateTransaction: (updateData: Partial<TransactionStore>) =>
        set((state) => {
          return {
            ...state,
            ...updateData,
          };
        }),
    }),
    {
      name: "transaction-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
