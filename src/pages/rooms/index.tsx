import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpenCheck, MoreHorizontal, PenIcon, PlusCircle, Trash } from "lucide-react"
import { useState } from "react"
import AddDialog from "./add-room"
import DeleteServiceDialog from "./delete-room"
import AddSpace from "./add-space"
import BookDialog from "./book-dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import useLocalStorage from "@/hooks/useLocalStorage"
import { GetAllRoomsType } from "@/types/Room.type"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { formatNumberComma } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const Rooms = () => {
  const [addRoom, setAddRoom] = useState<boolean>(false)
  const [addSpace, setAddSpace] = useState<boolean>(false)
  const [book, setBook] = useState<boolean>(false)
  const [edit, setEdit] = useState<number | undefined>()
  const [deleteModal, setDeleteModal] = useState<number | undefined>()
  const [data, ] = useLocalStorage<GetAllRoomsType[]>("rooms", [
    {
      id: 1,
      name: "AB21",
      type: "standard",
      empty_spaces: 3,
      spaces: [
        {
          id: 11,
          name: "Ab21 1",
          price: 12000,
          status: "booked",
          available_in: "22-08"
        },
        {
          id: 12,
          name: "Ab21 2",
          price: 10000,
          status: "empty"
        }, {
          id: 13,
          name: "Ab21 3",
          price: 12000,
          status: "booked",
          available_in: "02-09"
        }
      ]
    },
    {
      id: 2,
      name: "AB22",
      type: "standard",
      empty_spaces: 3,
      spaces: [
        {
          id: 22,
          name: "Ab22 2",
          price: 22000,
          status: "booked"
        },
        {
          id: 22,
          name: "Ab22 2",
          price: 20000,
          status: "empty"
        },
        {
          id: 23,
          name: "Ab22 3",
          price: 22000,
          status: "booked"
        }
      ]
    }
  ])

  return (
    <Card className="m-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>
            Xonalar
          </CardTitle>
          <CardDescription>
            Xonalar va ular haqidagi ma'lumotlar
          </CardDescription>
        </div>
        <div className="space-x-3">
          <Button onClick={() => setBook(true)} variant={"outline"}>
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                Xona raqami
              </TableHead>
              <TableHead>
                Xona turi
              </TableHead>
              <TableHead>
                Bo'sh joylar soni
              </TableHead>
              <TableHead>
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length ? data.map((room, index) => (
              <Collapsible key={index} asChild>
                <>
                  <CollapsibleTrigger asChild onClick={() => console.log('scldlfjdl', index)}>
                    <TableRow key={index}>
                      <TableCell>
                        {room.name}
                      </TableCell>
                      <TableCell>
                        {
                          room.type === "premium"
                            ? <Badge variant={"gold"}>Premium</Badge>
                            : <Badge variant={"outline"}>Standart</Badge>
                        }
                      </TableCell>
                      <TableCell>
                        {room.empty_spaces}
                      </TableCell>
                      <TableCell className="flex gap-3 items-center">
                        <PenIcon
                          onClick={() => setEdit(1)}
                          className="w-6 h-6 cursor-pointer text-blue-300 border border-blue-400 p-1 rounded-sm"
                        />
                        <Trash
                          onClick={() => setDeleteModal(1)}
                          className="w-6 h-6 cursor-pointer text-red-300 border border-red-400 p-1 rounded-sm"
                        />
                      </TableCell>
                    </TableRow>
                  </CollapsibleTrigger>
                  <CollapsibleContent asChild>
                    {data[index].spaces && data[index].spaces.length && (
                      <TableRow className="hover:bg-inherit">
                        <TableCell colSpan={99}>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>
                                  <div className="w-full flex items-center justify-between pr-2 border-r-2">
                                    Nomi
                                  </div>
                                </TableHead>
                                <TableHead>
                                  <div className="w-full flex items-center justify-between pr-2 border-r-2">
                                    Narxi
                                  </div>
                                </TableHead>
                                <TableHead>
                                  <div className="w-full flex items-center justify-between pr-2 border-r-2">
                                    Status
                                  </div>
                                </TableHead>
                                <TableHead>
                                  <div className="w-full flex items-center justify-between pr-2">
                                    Qachongacha band
                                  </div>
                                </TableHead>
                                <TableHead className="sr-only">
                                  Actions
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {data[index].spaces.map((space) => {
                                return (
                                  <TableRow className="p-0" key={space.id}>
                                    <TableCell className="p-2 px-4">{space.name}</TableCell>
                                    <TableCell className="p-2 px-4">
                                      {formatNumberComma(space.price)}
                                    </TableCell>
                                    <TableCell className="p-2 px-4">
                                      {
                                        space.status === "empty"
                                          ? <Badge variant={"success"}>Bo'sh</Badge>
                                          : <Badge variant={"destructive"}>Band</Badge>
                                      }
                                    </TableCell>
                                    <TableCell className="p-2 px-4">{space.available_in}</TableCell>
                                    <TableCell className="w-16">
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                          <Button aria-haspopup="true" size="icon" variant="ghost">
                                            <MoreHorizontal className="h-4 w-4" />
                                            <span className="sr-only">Menu</span>
                                          </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                          <DropdownMenuLabel>Harakatlar</DropdownMenuLabel>
                                          <DropdownMenuItem
                                            className="focus:bg-red-100 focus:text-red-800"
                                            onClick={() => setDeleteModal(space.id)}
                                          >
                                            O'chirish
                                          </DropdownMenuItem>
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    </TableCell>
                                  </TableRow>
                                )
                              })}
                            </TableBody>
                          </Table>
                        </TableCell>
                      </TableRow>
                    )}
                  </CollapsibleContent>
                </>
              </Collapsible>
            )) : (
              <TableRow>
                <TableCell colSpan={99} >
                  Hech narsa yo'q
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
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
      {book &&
        <BookDialog
          open={book}
          setOpen={setBook}
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