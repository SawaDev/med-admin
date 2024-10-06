import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { MoreVertical, PenLine, Trash2 } from "lucide-react";
import { Bed } from "@/types/Bed.type";
import useBeds from "@/hooks/useBeds";
import { TableCell } from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { formatNumberComma } from "@/lib/utils";
import AddBed from "./add-bed";
import DeleteBedDialog from "./delete-bed";

interface CollapsedRowsProps {
  id: number;
}

const CollapsedRows: React.FC<CollapsedRowsProps> = ({ id }) => {
  const [currentRow, setCurrentRow] = useState<number | undefined>();
  const [deleteBed, setDeleteBed] = useState<number | undefined>();
  const [edit, setEdit] = useState<Bed | undefined>();

  const { getRoomBedsQuery } = useBeds();

  const { data, isLoading, isError } = getRoomBedsQuery(id);

  if (isLoading) {
    return (
      <div>
        {Array.from({ length: 3 ?? 1 }).map(() => (
          <Skeleton className="h-16 w-full" />
        ))}
      </div>
    );
  }

  if (isError) {
    return <>Something went wrong</>;
  }

  return (
    <div className="divide-y-[1px]">
      {data?.data.map((item) => (
        <div
          onMouseEnter={() => setCurrentRow(item.id)}
          onMouseLeave={() => setCurrentRow(undefined)}
          className="grid grid-cols-10 w-full cursor-pointer text-[14px]"
        >
          <TableCell className="flex items-center col-span-4 pl-8">
            {item.name}
          </TableCell>
          <TableCell className="col-span-5">
            {formatNumberComma(item.price_in_sum)}
          </TableCell>
          <TableCell className="col-span-1 flex items-center justify-end p-2 pr-4">
            {currentRow === item.id && (
              <div onClick={(e) => e.stopPropagation()}>
                <Popover>
                  <PopoverTrigger>
                    <MoreVertical className="h-7 w-7 p-1" />
                  </PopoverTrigger>
                  <PopoverContent className="flex flex-col text-[16px] rounded-[20px] leading-[20px] z-50 w-72 border bg-white p-4 shadow-md outline-none divide-y-[1px]">
                    <div
                      onClick={() => setEdit(item)}
                      className="flex items-center justify-start gap-2 px-2 py-4 cursor-pointer hover:opacity-60"
                    >
                      <PenLine className="w-4 h-4" />
                      <span>O'zgartirish</span>
                    </div>
                    <div
                      onClick={() => setDeleteBed(item.id)}
                      className="flex items-center justify-start gap-2 px-2 py-4 cursor-pointer hover:opacity-60"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>O'chirish</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </TableCell>
        </div>
      ))}
      {edit && edit.id && (
        <AddBed
          open={edit ? true : false}
          setOpen={() => setEdit(undefined)}
          isEdit={edit}
        />
      )}
      {deleteBed && (
        <DeleteBedDialog
          open={deleteBed ? true : false}
          setOpen={() => setDeleteBed(deleteBed)}
          id={deleteBed}
        />
      )}
    </div>
  );
};

export default CollapsedRows;
