import TableComponent from "@/components/table"
import { serviceColumns } from "./columns"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { useState } from "react"
import AddDialog from "./add-dialog"
import { Service } from "@/types/Service.type"
import DeleteServiceDialog from "./delete-service"

const Services = () => {
  const [add, setAdd] = useState<boolean>(false)
  const [edit, setEdit] = useState<number | undefined>()
  const [deleteModal, setDeleteModal] = useState<number | undefined>()

  const loading = false

  const data: Service[] = [
    {
      id: 2222,
      name: "Test xizmat",
      price: 21000,
    }
  ]

  return (
    <Card className="m-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>
            Xizmatlar
          </CardTitle>
          <CardDescription>
            Xizmatlar va ular haqidagi ma'lumotlar
          </CardDescription>
        </div>
        <div>
          <Button onClick={() => setAdd(true)} variant={"outline"}>
            <PlusCircle className="w-4 h-4 mr-1" />
            Xizmat qo'shish
          </Button>
        </div>
      </CardHeader>
      <CardContent className="border m-2 rounded-sm">
        <TableComponent
          isLoading={loading}
          data={data}
          columns={serviceColumns(setEdit, setDeleteModal)}
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
        <DeleteServiceDialog
          open={deleteModal ? true : false}
          setOpen={() => setDeleteModal(undefined)}
        />
      }
    </Card>
  )
}

export default Services