import React from "react";
import { columns } from "./columns";
import TransactionForm from "./TransactionForm";
import { BrightEdgeTable } from "@/components/BrightEdgeTable";
import { PlusCircledIcon } from "@radix-ui/react-icons";

type Props = {
  transactions: Transaction[];
};

const TransactionAndTable = ({ transactions }: Props) => {
  return <BrightEdgeTable columns={columns} data={transactions} />;
};

export default TransactionAndTable;
