import TableComponent from "@/components/table"
import { Patient } from "@/types/Patient.type"
import { patientColumns } from "./columns"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { useState } from "react"
import AddDialog from "./add-dialog"
import DeletePatientDialog from "./delete-patient"

const Patients = () => {
  const [add, setAdd] = useState<boolean>(false)
  const [edit, setEdit] = useState<number | undefined>()
  const [deleteModal, setDeleteModal] = useState<number | undefined>()

  const loading = false

  const data: Patient[] = [
    {
      id: 2222,
      name: "Sardor",
      surname: "Mahmudov",
      birthdate: "21 08 2003",
      address: "Hasanboy QFY navroz"
    }
  ]

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
        <div>
          <Button onClick={() => setAdd(true)} variant={"outline"}>
            <PlusCircle className="w-4 h-4 mr-1" />
            Bemor qo'shish
          </Button>
        </div>
      </CardHeader>
      <CardContent className="border m-2 rounded-sm">
        <TableComponent
          isLoading={loading}
          data={data}
          columns={patientColumns(setEdit, setDeleteModal)}
        />
      </CardContent>
      {add &&
        <AddDialog
          open={add}
          setOpen={setAdd}
        />
      }
      {edit &&
        <AddDialog
          open={edit ? true : false}
          setOpen={() => setEdit(undefined)}
          isEdit={true}
        />
      }
      {deleteModal &&
        <DeletePatientDialog
          open={deleteModal ? true : false}
          setOpen={() => setDeleteModal(undefined)}
        />
      }
    </Card>
  )
}

export default Patients