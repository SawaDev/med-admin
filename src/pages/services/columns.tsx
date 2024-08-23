import { Service } from "@/types/Service.type";
import { ColumnDef } from "@tanstack/react-table"
import { PenIcon, Trash } from "lucide-react"
import { useMemo } from "react"


type ServiceColumnsType = (setEdit: (value: number) => void, setDelete: (value: number) => void) => ColumnDef<Service, any>[];

export const serviceColumns: ServiceColumnsType = (setEdit, setDelete) => {
  return useMemo<ColumnDef<Service, any>[]>(
    () => [
      {
        accessorKey: 'name',
        id: 'name',
        header: "Ism",
      },
      {
        accessorKey: 'price',
        id: 'price',
        header: "Narxi",
      },
      {
        accessorKey: 'id',
        id: "actions",
        header: () => <></>,
        cell: (info) => (
          <div className="flex gap-3 items-center">
            <PenIcon
              onClick={() => setEdit(info.getValue())}
              className="w-6 h-6 cursor-pointer text-blue-300 border border-blue-400 p-1 rounded-sm"
            />
            <Trash
              onClick={() => setDelete(info.getValue())}
              className="w-6 h-6 cursor-pointer text-red-300 border border-red-400 p-1 rounded-sm"
            />
          </div>
        )
      }
    ],
    []
  )
}