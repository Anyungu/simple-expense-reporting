"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CirclePower, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TransactionTypePoppover from "./TransactionTypePoppover";
import DatePicker from "./DatePicker";
import { useTransactionStore } from "@/store/transaction.store";
import { useAccountStore } from "@/store/account.store";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { getLiveBalanceAfterTransaction } from "@/lib/transaction.util";
import { useSession } from "next-auth/react";

type CardProps = React.ComponentProps<typeof Card>;
type CustomProps = {};
type Props = CardProps & CustomProps;

const TransactionForm = ({ className, ...props }: Props) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const { name, reference, amount, type, date, updateTransaction } =
    useTransactionStore();

  const { toast } = useToast();

  return (
    <Card className={cn("w-full laptop:w-[680px]", className)} {...props}>
      <CardHeader>
        <CardTitle className=" uppercase">New Transaction</CardTitle>
        <CardDescription>
          {" "}
          <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
            <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
            <p>Add your transactions here</p>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-8">
        <div className=" flex items-center space-x-4 border-b"></div>
        <div>
          <div className=" flex flex-col space-y-1">
            <label
              htmlFor="title"
              className="text-xs pl-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Transaction Type
            </label>
            <TransactionTypePoppover />
          </div>
        </div>

        <div>
          <div className=" flex flex-col space-y-1">
            <label
              htmlFor="title"
              className="text-xs pl-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Amount
            </label>
            <Input
              type="number"
              placeholder="Transaction Amount"
              value={amount}
              onChange={(e) => {
                updateTransaction({ amount: parseInt(e.target.value) });
              }}
            />
          </div>
        </div>

        <div>
          <div className=" flex flex-col space-y-1">
            <label
              htmlFor="title"
              className="text-xs pl-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Reference/Cash
            </label>
            <Input
              type="text"
              placeholder="Transaction Details"
              value={reference}
              onChange={(e) => updateTransaction({ reference: e.target.value })}
            />
          </div>
        </div>

        <div>
          <div className=" flex flex-col space-y-1">
            <label
              htmlFor="title"
              className="text-xs pl-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Name/Description
            </label>
            <Input
              type="text"
              placeholder="Transaction Details"
              value={name}
              onChange={(e) => updateTransaction({ name: e.target.value })}
            />
          </div>
        </div>

        <div>
          <div className=" flex flex-col space-y-1">
            <label
              htmlFor="title"
              className="text-xs pl-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Date
            </label>
            <DatePicker />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={() => {
            setLoading(true);
            fetch("/api/transaction", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                data: {
                  date,
                  description: name,
                  type,
                  amount,
                  reference,
                  companyId: session?.user?.companies[0]?.id,
                },
                balanceChange: getLiveBalanceAfterTransaction(type, amount),
              }),
            }).then(async (res) => {
              setLoading(false);
              if (res.status === 200) {
                toast({
                  description: "Success",
                  variant: "default",
                });
              } else {
                const { error } = await res.json();
                toast({
                  description: "Fail",
                  variant: "destructive",
                });
              }
            });
          }}
        >
          <Loader2
            className={`mr-2 h-4 w-4 animate-spin ${
              loading ? "block" : "hidden"
            } `}
          />{" "}
          Verify and submit
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TransactionForm;
