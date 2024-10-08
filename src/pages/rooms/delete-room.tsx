import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useRooms from "@/hooks/useRooms";
import { SheetType } from "@/types/Other.type";
import { FC } from "react";

const DeleteRoomDialog: FC<SheetType & { id: number }> = ({
  open,
  setOpen,
  id,
}) => {
  const { deleteRoomMutation } = useRooms();

  const deleteRoom = deleteRoomMutation(id);

  const handleDelete = () => {
    deleteRoom.mutateAsync().then(() => setOpen(false));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Xonani o'chirish</DialogTitle>
          <DialogDescription>
            Ushbu xonaning ma'lumotlari o'chirilgandan so'ng uni qayta tiklab
            bo'lmaydi!
          </DialogDescription>
          <div className="flex items-center justify-end gap-3 mt-3">
            <Button variant={"outline"} onClick={() => setOpen(false)}>
              Bekor qilish
            </Button>
            <Button onClick={handleDelete} variant={"destructive"}>
              O'chirish
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteRoomDialog;
