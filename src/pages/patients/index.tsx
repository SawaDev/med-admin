import { Patient } from "@/types/Patient.type"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Ban, PenIcon, PlusCircle, Trash } from "lucide-react"
import { useState } from "react"
import AddDialog from "./add-dialog"
import DeletePatientDialog from "./delete-patient"
import AttachServiceDialog from "./attach-service"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useNavigate } from "react-router-dom"
import CancelBookingDialog from "./cancel-booking"

const Patients = () => {
  const [add, setAdd] = useState<boolean>(false)
  const [addService, setAddService] = useState<boolean>(false)
  const [edit, setEdit] = useState<number | undefined>()
  const [deleteModal, setDeleteModal] = useState<number | undefined>()
  const [cancelModal, setCancelModal] = useState<number | undefined>()

  const navigate = useNavigate()

  const data: Patient[] = [
    {
      id: 2222,
      name: "Sardor",
      surname: "Mahmudov",
      birthdate: "21 08 2003",
      address: "Hasanboy QFY navroz"
    }
  ]

  const handleEdit = (e: React.MouseEvent<SVGSVGElement, MouseEvent>, id: number) => {
    e.stopPropagation()
    setEdit(id)
  }

  const handleDelete = (e: React.MouseEvent<SVGSVGElement, MouseEvent>, id: number) => {
    e.stopPropagation()
    setDeleteModal(id)
  }

  const handleCancel = (e: React.MouseEvent<SVGSVGElement, MouseEvent>, id: number) => {
    e.stopPropagation()
    setCancelModal(id)
  }

  return (
    <Card className="m-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>
            Bemorlar
          </CardTitle>
          <CardDescription>
            Bemorlar va ular haqidagi ma'lumotlar
          </CardDescription>
        </div>
        <div className="space-x-2">
          <Button onClick={() => setAddService(true)} variant={"outline"}>
            <PlusCircle className="w-4 h-4 mr-1" />
            Xizmat biriktirish
          </Button>
          <Button onClick={() => setAdd(true)} variant={"outline"}>
            <PlusCircle className="w-4 h-4 mr-1" />
            Bemor qo'shish
          </Button>
        </div>
      </CardHeader>
      <CardContent className="border m-2 rounded-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <div className="w-full flex items-center justify-between pr-2 border-r-2">
                  Ism
                </div>
              </TableHead>
              <TableHead>
                <div className="w-full flex items-center justify-between pr-2 border-r-2">
                  Familya
                </div>
              </TableHead>
              <TableHead>
                <div className="w-full flex items-center justify-between pr-2 border-r-2">
                  Tug'ilgan Kun
                </div>
              </TableHead>
              <TableHead>
                <div className="w-full flex items-center justify-between pr-2 border-r-2">
                  Manzil
                </div>
              </TableHead>
              <TableHead className="sr-only">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data ? data.map((patient) => (
              <TableRow key={patient.id} onClick={() => navigate(`/patients/${patient.id}`)}>
                <TableCell>
                  {patient.name}
                </TableCell>
                <TableCell>
                  {patient.surname}
                </TableCell>
                <TableCell>
                  {patient.birthdate}
                </TableCell>
                <TableCell>
                  {patient.address}
                </TableCell>
                <TableCell>
                  <div className="flex gap-3 items-center">
                    <Ban
                      onClick={(e) => handleCancel(e, patient.id)}
                      className="w-6 h-6 cursor-pointer text-blue-300 border border-blue-400 p-1 rounded-sm"
                    />
                    <PenIcon
                      onClick={(e) => handleEdit(e, patient.id)}
                      className="w-6 h-6 cursor-pointer text-green-300 border border-green-400 p-1 rounded-sm"
                    />
                    <Trash
                      onClick={(e) => handleDelete(e, patient.id)}
                      className="w-6 h-6 cursor-pointer text-red-300 border border-red-400 p-1 rounded-sm"
                    />
                  </div>
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell
                  colSpan={99}
                  className="h-24 text-center"
                >
                  Hech narsa yo'q.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table >
      </CardContent>
      {add &&
        <AddDialog
          open={add}
          setOpen={setAdd}
        />
      }
      {addService &&
        <AttachServiceDialog
          open={addService}
          setOpen={setAddService}
        />
      }
      {edit &&
        <AddDialog
          open={!!edit}
          setOpen={() => setEdit(undefined)}
          isEdit={true}
        />
      }
      {deleteModal &&
        <DeletePatientDialog
          open={!!deleteModal}
          setOpen={() => setDeleteModal(undefined)}
        />
      }
      {cancelModal &&
        <CancelBookingDialog
          open={!!cancelModal}
          setOpen={() => setCancelModal(undefined)}
        />
      }
    </Card>
  )
}

export default Patients