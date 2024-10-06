import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpenCheck, PenIcon, PlusCircle, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import AddDialog from "./add-room";
import DeleteRoom from "./delete-room";

import { TableCell, TableHead, TableRow } from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import useRooms from "@/hooks/useRooms";
import AddBed from "./add-bed";
import { Room } from "@/types/Room.type";
import CollapsedRows from "./collapsed-rows";
import AttachServiceDialog from "../patients/attach-service";

const Rooms = () => {
  const [addRoom, setAddRoom] = useState<boolean>(false);
  const [addSpace, setAddSpace] = useState<boolean>(false);
  const [book, setBook] = useState<boolean>(false);
  const [edit, setEdit] = useState<Room | undefined>();
  const [deleteModal, setDeleteModal] = useState<number | undefined>();
  const [roomsState, setRoomsState] = useState<{ [key: number]: boolean }>({});

  const { getAllRoomsQuery } = useRooms();

  const {
    data: rooms,
    isError: roomsError,
    isLoading: roomsLoading,
  } = getAllRoomsQuery();

  useEffect(() => {
    if (rooms) {
      const groups = rooms?.data.filter((item) => item.id);
      groups?.forEach((item) =>
        setRoomsState((prev) => ({ ...prev, [item.id]: false }))
      );
    }
  }, [rooms]);

  const handleRowClick = (room: Room) => {
    setRoomsState((prev) => ({ ...prev, [room.id]: !prev[room.id] }));
  };

  return (
    <Card className="m-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Xonalar</CardTitle>
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
        <div className="grid grid-cols-10 content-center bg-white border-b-[1px]">
          <TableHead className="col-span-4 flex items-center">
            Xona raqami
          </TableHead>
          <TableHead className="col-span-4 flex items-center">
            Xona turi
          </TableHead>
          <TableHead className="hidden">Action</TableHead>
        </div>
        {!roomsError && !roomsLoading && rooms?.data.length ? (
          rooms?.data.map((room, index) => (
            <Collapsible
              open={roomsState[room.id]}
              onOpenChange={(open) =>
                setRoomsState((prev) => ({ ...prev, [room.id]: open }))
              }
              key={room.id}
            >
              <TableRow
                key={index}
                onClick={() => handleRowClick(room)}
                className={`grid grid-cols-10 w-full bg-white cursor-pointer`}
              >
                <TableCell className="col-span-4 flex items-center gap-1">
                  {room.name}
                </TableCell>
                <TableCell className="col-span-4">
                  {room.type.id === "vip" ? (
                    <Badge variant={"gold"}>{room.type.name}</Badge>
                  ) : (
                    <Badge variant={"outline"}>{room.type.name}</Badge>
                  )}
                </TableCell>
                <TableCell className="col-span-2 flex gap-3 items-center">
                  <PenIcon
                    onClick={() => setEdit(room)}
                    className="w-6 h-6 cursor-pointer text-blue-300 border border-blue-400 p-1 rounded-sm"
                  />
                  <Trash
                    onClick={() => setDeleteModal(1)}
                    className="w-6 h-6 cursor-pointer text-red-300 border border-red-400 p-1 rounded-sm"
                  />
                </TableCell>
              </TableRow>
              <CollapsibleContent className="w-full">
                {roomsState[room.id] && <CollapsedRows id={room.id} />}
              </CollapsibleContent>
            </Collapsible>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={99}>Hech narsa yo'q</TableCell>
          </TableRow>
        )}
      </CardContent>
      {addRoom && <AddDialog open={addRoom} setOpen={setAddRoom} />}
      {addSpace && (
        <AddBed
          open={addSpace}
          setOpen={setAddSpace}
          handleAddRoom={() => setAddRoom(true)}
        />
      )}
      {book && <AttachServiceDialog open={book} setOpen={setBook} />}
      {edit && (
        <AddDialog
          open={edit ? true : false}
          setOpen={() => setEdit(undefined)}
          isEdit={edit}
        />
      )}
      {deleteModal && (
        <DeleteRoom
          open={deleteModal ? true : false}
          setOpen={() => setDeleteModal(undefined)}
          id={deleteModal}
        />
      )}
    </Card>
  );
};

export default Rooms;
