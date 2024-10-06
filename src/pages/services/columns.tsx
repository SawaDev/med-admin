import { formatNumberComma } from "@/lib/utils";
import { TherapyType } from "@/types/TherapyType.type";
import { ColumnDef } from "@tanstack/react-table";
import { PenIcon, Trash } from "lucide-react";
import { useMemo } from "react";

type ServiceColumnsType = (
  setEdit: (value: TherapyType) => void,
  setDelete: (value: number) => void
) => ColumnDef<TherapyType, any>[];

export const serviceColumns: ServiceColumnsType = (setEdit, setDelete) => {
  return useMemo<ColumnDef<TherapyType, any>[]>(
    () => [
      {
        accessorKey: "name",
        id: "name",
        header: "Ism",
      },
      {
        accessorKey: "price_in_sum",
        id: "price_in_sum",
        header: "Narxi",
        cell: (info) => formatNumberComma(info.getValue())
      },
      {
        accessorKey: "id",
        id: "actions",
        header: () => <></>,
        cell: (info) => (
          <div className="flex gap-3 items-center">
            <PenIcon
              onClick={() => setEdit(info.row.original)}
              className="w-6 h-6 cursor-pointer text-blue-300 border border-blue-400 p-1 rounded-sm"
            />
            <Trash
              onClick={() => setDelete(info.row.original.id)}
              className="w-6 h-6 cursor-pointer text-red-300 border border-red-400 p-1 rounded-sm"
            />
          </div>
        ),
      },
    ],
    []
  );
};
