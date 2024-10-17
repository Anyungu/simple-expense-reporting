import Image from "next/image";
import TransactionForm from "./components/TransactionForm";
import { getAccounts, getTransactions } from "@/db/db.util";
import ClientStoreInitializer from "@/components/ClientStoreInitializer";
import { BrightEdgeTable } from "@/components/BrightEdgeTable";
import { columns } from "./components/columns";
import TransactionAndTable from "./components/TransactionAndTable";
import MainPage from "./MainPage";
import { auth } from "@/auth";

export const revalidate = 0;

export default async function Home() {
  const session = await auth();
  const transactions = await getTransactions(
    session?.user?.companies[0]?.id || 0
  );
  const accounts = await getAccounts(session?.user?.companies[0]?.id || 0);
  return (
    <main className=" h-[calc(100dvh)] w-full">
      <MainPage transactions={transactions} accounts={accounts} />
    </main>
  );
}
