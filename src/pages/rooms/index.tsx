import TableComponent from "@/components/table"
import { spaceColumns } from "./columns"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpenCheck, PlusCircle } from "lucide-react"
import { useState } from "react"
import AddDialog from "./add-room"
import DeleteServiceDialog from "./delete-room"
import AddSpace from "./add-space"
import { Space } from "@/types/Space.type"

const Rooms = () => {
  const [addRoom, setAddRoom] = useState<boolean>(false)
  const [addSpace, setAddSpace] = useState<boolean>(false)
  const [assign, setAssign] = useState<boolean>(false)
  const [edit, setEdit] = useState<number | undefined>()
  const [deleteModal, setDeleteModal] = useState<number | undefined>()

  const loading = false

  const data: Space[] = [
    {
      id: 2222,
      name: "AB21",
      price: 21000,
      room_id: 12,
      status: "empty"
    }
  ]

  return (
    <Card className="m-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>
            Joylar
          </CardTitle>
          <CardDescription>
            Joylar va ular haqidagi ma'lumotlar
          </CardDescription>
        </div>
        <div className="space-x-3">
          <Button onClick={() => setAssign(true)} variant={"outline"}>
            <BookOpenCheck className="w-4 h-4 mr-1" />
            Joy band qilish
          </Button>
          <Button onClick={() => setAddSpace(true)} variant={"outline"}>
            <PlusCircle className="w-4 h-4 mr-1" />
            Joy qo'shish
          </Button>
          <Button onClick={() => setAddRoom(true)} variant={"outline"}>
            <PlusCircle className="w-4 h-4 mr-1" />
            Xona qo'shish
          </Button>
        </div>
      </CardHeader>
      <CardContent className="border m-2 rounded-sm">
        <TableComponent
          isLoading={loading}
          data={data}
          columns={spaceColumns(setEdit, setDeleteModal)}
        />
      </CardContent>
      {addRoom &&
        <AddDialog
          open={addRoom}
          setOpen={setAddRoom}
        />
      }
      {addSpace &&
        <AddSpace
          open={addSpace}
          setOpen={setAddSpace}
          handleAddRoom={() => setAddRoom(true)}
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

export default Rooms