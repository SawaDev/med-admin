import DynamicForm from "@/components/form/DynamicForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { fields } from "./form-fields";
import { FC, useEffect } from "react";
import { SheetType } from "@/types/Other.type";
import { Button } from "@/components/ui/button";
import { CreateTherapyType, TherapyType } from "@/types/TherapyType.type";
import { createTherapyTypeSchema } from "@/schema/therapy-type";
import useTherapyTypes from "@/hooks/useTherapyTypes";

type AddDialogProps = SheetType & {
  isEdit?: TherapyType;
};

const AddDialog: FC<AddDialogProps> = ({ open, setOpen, isEdit }) => {
  const { createTherapyTypeMutation, updateTherapyTypeMutation } =
    useTherapyTypes();

  const createTherapyType = createTherapyTypeMutation();
  const updateTherapy = updateTherapyTypeMutation(isEdit?.id);

  const form = useForm<CreateTherapyType>({
    resolver: zodResolver(createTherapyTypeSchema),
  });

  useEffect(() => {
    if (isEdit) {
      form.reset({
        name: isEdit.name,
        price_in_sum: isEdit.price_in_sum,
      });
    }
  }, [isEdit]);

  const onSubmit = (values: CreateTherapyType) => {
    if (isEdit) {
      updateTherapy.mutateAsync(values).then(() => setOpen(false));
    } else {
      createTherapyType.mutateAsync(values).then(() => setOpen(false));
    }

    return;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <Form {...form}>
          <DialogHeader className="h-8">
            <DialogTitle>
              {isEdit
                ? "Xizmatning ma'lumotlarini o'zgartirish"
                : "Yangi xizmatni kiritish"}
            </DialogTitle>
            <DialogDescription>
              {isEdit
                ? "Xizmatning ma'lumotlarini o'zgartiring"
                : "Yangi xizmatning ma'lumotlarini kiriting"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <DynamicForm control={form.control} fields={fields} />
            <div className="flex gap-2 justify-end">
              <Button
                type="button"
                variant={"outline"}
                onClick={() => setOpen(false)}
              >
                Bekor qilish
              </Button>
              <Button
                type="submit"
                variant={"default"}
                disabled={
                  createTherapyType.isPending || updateTherapy.isPending
                }
              >
                Saqlash
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDialog;
