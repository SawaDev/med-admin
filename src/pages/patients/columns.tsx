import { Patient } from "@/types/Patient.type"
import { ColumnDef } from "@tanstack/react-table"
import { PenIcon, Trash } from "lucide-react"
import { useMemo } from "react"


type PatientColumnsType = (setEdit: (value: number) => void, setDelete: (value: number) => void) => ColumnDef<Patient, any>[];

export const patientColumns: PatientColumnsType = (setEdit, setDelete) => {

  const handleEdit = (e: React.MouseEvent<SVGSVGElement, MouseEvent>, id: number) => {
    e.stopPropagation()
    setEdit(id)
    return console.log('first')
  }

  return useMemo<ColumnDef<Patient, any>[]>(
    () => [
      {
        accessorKey: 'name',
        id: 'name',
        header: "Ism",
      },
      {
        accessorKey: 'surname',
        id: 'surname',
        header: "Familya",
      },
      {
        accessorKey: 'birthdate',
        id: 'birthdate',
        header: "Tug'ilgan kun",
      },
      {
        accessorKey: 'address',
        id: 'address',
        header: "Address"
      },
      {
        accessorKey: 'id',
        id: "actions",
        header: () => <></>,
        cell: (info) => (
          <div className="flex gap-3 items-center">
            <PenIcon
              onClick={(e) => handleEdit(e, info.getValue())}
              className="w-6 h-6 cursor-pointer text-blue-300 border border-blue-400 p-1 rounded-sm"
            />
            <Trash
              onClick={(e) => {
                e.stopPropagation()
                setDelete(info.getValue())
              }}
              className="w-6 h-6 cursor-pointer text-red-300 border border-red-400 p-1 rounded-sm"
            />
          </div>
        )
      }
    ],
    [setEdit, setDelete]
  )
}