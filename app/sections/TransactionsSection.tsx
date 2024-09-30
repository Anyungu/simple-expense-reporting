import React from "react";
import TransactionAndTable from "../components/TransactionAndTable";

type Props = {
  transactions: Transaction[];
};

const TransactionsSection = ({ transactions }: Props) => {
  return <TransactionAndTable transactions={transactions} />;
};

export default TransactionsSection;
