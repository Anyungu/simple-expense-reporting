import Image from "next/image";
import TransactionForm from "./components/TransactionForm";
import { getAccounts, getTransactions } from "@/db/db.util";
import ClientStoreInitializer from "@/components/ClientStoreInitializer";
import { BrightEdgeTable } from "@/components/BrightEdgeTable";
import { columns } from "./components/columns";
import TransactionAndTable from "./components/TransactionAndTable";

export const revalidate = 0;

export default async function Home() {
  const accounts = await getAccounts();
  const transactions = await getTransactions();
  console.log(transactions);
  return (
    <main className=" min-h-screen">
      <ClientStoreInitializer accounts={accounts} />
      <TransactionAndTable transactions={transactions} />
    </main>
  );
}
