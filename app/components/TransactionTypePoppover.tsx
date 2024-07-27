"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { transactionTypeOptions } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useTransactionStore } from "@/store/transaction.store";
import { Check, ChevronsUpDown } from "lucide-react";
import React, { useState } from "react";
type Props = {};
type Option = {
  text: string;
  value: string;
};

const TransactionTypePoppover = ({}: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const { type, updateTransaction } = useTransactionStore();

  return (
    <Popover open={open} onOpenChange={() => setOpen((prevOpen) => !prevOpen)}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[100%] justify-between"
        >
          {type ? type : "Select Option..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[100%] p-0">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>Not found.</CommandEmpty>
            <CommandGroup>
              {transactionTypeOptions?.map((option: Option) => {
                return (
                  <CommandItem
                    className="w-[100%]"
                    key={option?.value}
                    value={option?.value}
                    onSelect={() => {
                      updateTransaction({
                        type: option?.value as TransactionType,
                      });
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        type === option.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {option.text}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default TransactionTypePoppover;
