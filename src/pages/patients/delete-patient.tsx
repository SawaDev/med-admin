import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import usePatients from "@/hooks/usePatients";
import { FC } from "react";

type DeletePatientType = {
  open: number | undefined;
  setOpen: () => void;
};

const DeletePatientDialog: FC<DeletePatientType> = ({ open, setOpen }) => {
  const { deletePatientMutation } = usePatients();

  const deletePatient = deletePatientMutation(open);

  const handleDelete = () => {
    deletePatient.mutateAsync().catch((err) => console.log(err));
    return setOpen()
  };
  
  return (
    <Dialog open={!!open} onOpenChange={() => setOpen()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Bemorni o'chirish</DialogTitle>
          <DialogDescription>
            Ushbu bemorning ma'lumotlari o'chirilgandan so'ng uni qayta tiklab
            bo'lmaydi!
          </DialogDescription>
          <div className="flex items-center justify-end gap-3 mt-3">
            <Button variant={"outline"} onClick={() => setOpen()}>
              Bekor qilish
            </Button>
            <Button variant={"destructive"} onClick={handleDelete}>
              O'chirish
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DeletePatientDialog;
