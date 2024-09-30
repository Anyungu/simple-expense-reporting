import Image from "next/image";
import TransactionForm from "./components/TransactionForm";
import { getAccounts, getTransactions } from "@/db/db.util";
import ClientStoreInitializer from "@/components/ClientStoreInitializer";
import { BrightEdgeTable } from "@/components/BrightEdgeTable";
import { columns } from "./components/columns";
import TransactionAndTable from "./components/TransactionAndTable";
import MainPage from "./MainPage";

export const revalidate = 0;

export default async function Home() {
  const transactions = await getTransactions();
  const accounts = await getAccounts();
  return (
    <main className=" min-h-screen w-full">
      <MainPage transactions={transactions} accounts={accounts} />
    </main>
  );
}
