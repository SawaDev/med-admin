import { Badge } from "@/components/ui/badge";
import { Service } from "@/types/Service.type";
import { Space } from "@/types/Space.type";
import { ColumnDef } from "@tanstack/react-table"
import { PenIcon, Trash } from "lucide-react"
import { useMemo } from "react"


type SpaceColumnsType = (setEdit: (value: number) => void, setDelete: (value: number) => void) => ColumnDef<Space, any>[];

export const spaceColumns: SpaceColumnsType = (setEdit, setDelete) => {
  return useMemo<ColumnDef<Space, any>[]>(
    () => [
      {
        accessorKey: 'name',
        id: 'name',
        header: "Nomi",
      },
      {
        accessorKey: 'price',
        id: 'price',
        header: "Narxi",
      },
      {
        accessorKey: 'status',
        id: 'status',
        header: "Status",
        cell: (info) => {
          if (info.getValue() === "booked") {
            return <Badge variant={"destructive"}>Band qilingan</Badge>
          } else {
            return <Badge variant={"success"}>Bo'sh</Badge>
          }
        }
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