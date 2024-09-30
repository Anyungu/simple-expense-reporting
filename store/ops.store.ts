import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type OpsStore = {
  activeHeaderTab: HeaderTab;
  updateActiveHeaderTab: (newActiveTab: HeaderTab) => void;
};

export const useOpsStore = create<OpsStore>()(
  persist(
    (set, get) => ({
      activeHeaderTab: "accounts",

      updateActiveHeaderTab: (newActiveTab: HeaderTab) =>
        set((state) => {
          return {
            ...state,
            activeHeaderTab: newActiveTab,
          };
        }),
    }),
    {
      name: "ops-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
