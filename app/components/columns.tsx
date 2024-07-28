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
import { toast } from "@/components/ui/use-toast";
import { ColumnDef, Row, Table } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import TableSorting from "./TableSorting";
import { format } from "date-fns";

type Props = {
  row: Row<Transaction>;
};

const ActionHeader = ({ row }: Props) => {
  const router = useRouter();
  const user = row.original as any;
  // const session = useCheckSession({ router });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          className=" cursor-pointer"
          onClick={() => navigator.clipboard.writeText(user.phoneNumber)}
        >
          Copy phone
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className=" cursor-pointer"
          onClick={() => {
            // deleteRequest(
            //   "admin/user/delete",
            //   {
            //     supabaseUid: user.supabaseUid,
            //   },
            //   { authorization: `Bearer ${session?.access_token}` }!!
            // )
            //   .then((res) => {
            //     // setUploading(false)
            //     router.refresh();
            //     toast({
            //       className: cn(
            //         "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 bg-green-300"
            //       ),
            //       variant: "default",
            //       title: "Success",
            //       description: "User deleted",
            //     });
            //   })
            //   .catch((e) => {
            //     console.error(e);
            //     // updateDirectSpecificEvent({ popularEvent: !val })
            //     // setUploading(false)
            //     toast({
            //       className: cn(
            //         "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 bg-red-300"
            //       ),
            //       variant: "default",
            //       title: "Uh oh! Something went wrong.",
            //       description: "Delete failed",
            //     });
            //   });
          }}
        >
          Delete user
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
  // {
  //   accessorKey: "lastName",
  //   header: ({ column }) => <TableSorting column={column} title="Last Name" />,
  // },
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
    header: ({ column }) => <TableSorting column={column} title="Desc" />,
    accessorKey: "description",
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
