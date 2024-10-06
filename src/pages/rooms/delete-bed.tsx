import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useBeds from "@/hooks/useBeds";
import { SheetType } from "@/types/Other.type";
import { FC } from "react";

const DeleteBedDialog: FC<SheetType & { id: number }> = ({
  open,
  setOpen,
  id,
}) => {
  const { deleteBedMutation } = useBeds();

  const deleteBed = deleteBedMutation(id);

  const handleDelete = () => {
    deleteBed.mutateAsync().then(() => setOpen(false));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Yotoqni o'chirish</DialogTitle>
          <DialogDescription>
            Ushbu yotoqning ma'lumotlari o'chirilgandan so'ng uni qayta tiklab
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

export default DeleteBedDialog;
