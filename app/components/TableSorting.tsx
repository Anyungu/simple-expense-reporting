import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import React from "react";

type Props = {
  title: string;
  column: any;
};
function TableSorting({ title, column }: Props) {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {title}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
}

export default TableSorting;
