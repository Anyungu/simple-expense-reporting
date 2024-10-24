"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { ColumnDef, Row, Table } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import TableSorting from "./TableSorting";
import { format } from "date-fns";
import { getLiveBalanceAfterTransaction } from "@/lib/transaction.util";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";

type Props = {
  row: Row<Transaction>;
};

const ActionHeader = ({ row }: Props) => {
  const router = useRouter();
  const { toast } = useToast();
  const { data: session } = useSession();
  const transaction = row.original as Transaction;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        {/* <DropdownMenuItem
          className=" cursor-pointer"
          onClick={() => navigator.clipboard.writeText(user.phoneNumber)}
        >
          Copy phone
        </DropdownMenuItem> */}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className=" cursor-pointer"
          onClick={() => {
            // setLoading(true);
            fetch("/api/transaction", {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                companyId: session?.user?.companies[0]?.id,
                id: transaction?.id,
                transactionRolled: !transaction?.transactionRolled,
                balanceChange: getLiveBalanceAfterTransaction(
                  transaction?.type,
                  transaction?.transactionRolled
                    ? transaction?.amount
                    : -transaction?.amount
                ),
              }),
            }).then(async (res) => {
              // setLoading(false);
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
          Roll Back
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const columns: ColumnDef<Transaction>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: ({ column }) => <TableSorting column={column} title="Type" />,
    accessorKey: "type",
  },

  {
    header: ({ column }) => <TableSorting column={column} title="Amount" />,
    accessorKey: "amount",
  },

  {
    header: ({ column }) => <TableSorting column={column} title="Date" />,
    accessorKey: "date",
    cell: ({ row }) => {
      const date = row.original.date;
      return date ? format(new Date(date), "PPP") : "N/A";
    },
  },
  {
    accessorKey: "transactionRolled",
    header: ({ column }) => <TableSorting column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.original.transactionRolled;
      return (
        <span
          className={`relative inline-flex rounded-full h-3 w-3 ${
            status === false ? "bg-green-500" : "bg-red-500"
          }`}
        ></span>
      );
    },
  },
  {
    header: ({ column }) => <TableSorting column={column} title="Desc" />,
    accessorKey: "description",
  },
  {
    accessorKey: "reference",
    header: ({ column }) => <TableSorting column={column} title="Reference" />,
  },
  // {
  //   header: "Role",
  //   cell: ({ row }) => {
  //     const current = row?.original as any;
  //     return (
  //       <Select
  //         value={`${
  //           roleOptions?.find((el) => el.value === current?.role)?.value
  //         }`}
  //         onValueChange={(value) => {
  //           // console.log(value);
  //         }}
  //       >
  //         <SelectTrigger>
  //           <SelectValue
  //             className="bg-white w-full cursor-pointer"
  //             placeholder="Select a location"
  //           />
  //         </SelectTrigger>

  //         <SelectContent>
  //           {roleOptions?.map((role, idx) => {
  //             return (
  //               <SelectItem key={idx} value={`${role?.value}`}>
  //                 {role?.text}
  //               </SelectItem>
  //             );
  //           })}
  //         </SelectContent>
  //       </Select>
  //     );
  //   },
  // },
  {
    id: "action",
    cell: ({ row }) => <ActionHeader row={row} />,
  },
];
