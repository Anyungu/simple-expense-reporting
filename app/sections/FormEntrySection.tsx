import React from "react";
import TransactionForm from "../components/TransactionForm";

type Props = {};

function FormEntrySection({}: Props) {
  return (
    <div className=" flex flex-row items-center justify-center">
      <TransactionForm />
    </div>
  );
}

export default FormEntrySection;
