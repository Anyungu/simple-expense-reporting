"use client";
import React, { useEffect, useRef, useState } from "react";
import { columns } from "./columns";
import TransactionForm from "./TransactionForm";
import { BrightEdgeTable } from "@/components/BrightEdgeTable";
import { PlusCircledIcon } from "@radix-ui/react-icons";

type Props = {
  transactions: Transaction[];
};

const TransactionAndTable = ({ transactions }: Props) => {
  const [showForm, setShowForm] = useState(false);
  const [formHeight, setFormHeight] = useState("0px");
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showForm && formRef.current) {
      setFormHeight(`${formRef.current.scrollHeight}px`);
    } else {
      setFormHeight("0px");
    }
  }, [showForm]);

  const toggleForm = () => setShowForm(!showForm);
  return (
    <div className=" flex flex-col justify- items-center py-4">
      <div
        ref={formRef}
        className={`transition-all duration-1000 ease-in-out overflow-hidden`}
        style={{
          maxHeight: formHeight,
          opacity: showForm ? 1 : 0,
        }}
      >
        <>
          <div className="flex justify-end">
            <PlusCircledIcon
              className=" text-purple-600 h-8 w-8 hover:cursor-pointer"
              onClick={toggleForm}
            />
          </div>
          {showForm && <TransactionForm />}
        </>
      </div>

      <div className="w-[90%]">
        <div className="flex justify-end">
          <PlusCircledIcon
            className=" text-purple-600 h-8 w-8 hover:cursor-pointer"
            onClick={toggleForm}
          />
        </div>
        <BrightEdgeTable columns={columns} data={transactions} />
      </div>
    </div>
  );
};

export default TransactionAndTable;
