import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function GeneralSkeleton() {
  return (
    <div className="flex flex-col pt-20 space-y-3 items-center justify-center h-full">
      {/* <div className=' font-semibold'>Fetching data...</div> */}
      <Skeleton className="h-[125px] w-[250px] rounded-xl bg-gray-400" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]  bg-gray-400" />
        <Skeleton className="h-4 w-[200px]  bg-gray-400" />
      </div>
    </div>
  );
}

export default GeneralSkeleton;
