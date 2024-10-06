import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { createPatientSchema } from "@/schema/patient";
import { CreatePatient, Patient } from "@/types/Patient.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FC, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/form/FormInput";
import { FormTextarea } from "@/components/form/FormTextarea";
import { FormDatePicker } from "@/components/form/FormDatePicker";
import usePatients from "@/hooks/usePatients";

type AddDialogProps = {
  open: boolean;
  setOpen: () => void;
  data?: Patient;
};

const AddDialog: FC<AddDialogProps> = ({ open, setOpen, data }) => {
  const { createPatientMutation, updatePatientMutation } = usePatients();

  const createPatient = createPatientMutation();
  const updatePatient = updatePatientMutation(data?.id);

  const form = useForm<CreatePatient>({
    resolver: zodResolver(createPatientSchema),
  });

  useEffect(() => {
    if (!!data) {
      form.reset({
        ...data,
      });
    }
  }, [data]);

  const onSubmit = (values: CreatePatient) => {
    if (!!data) {
      updatePatient
        .mutateAsync(values)
        .catch((err) => {
          console.log(err);
        });
    } else {
      createPatient
        .mutateAsync(values)
    }

    return setOpen()
  };

  return (
    <Dialog open={open} onOpenChange={() => setOpen()}>
      <DialogContent>
        <Form {...form}>
          <DialogHeader className="h-8">
            <DialogTitle>Yangi bemorni kiritish</DialogTitle>
            <DialogDescription>
              Yangi bemorning ma'lumotlarini kiriting
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormInput
              name="name"
              control={form.control}
              label="Ismi"
              placeholder="Ismi"
            />
            <FormInput
              name="phone_number"
              control={form.control}
              label="Telefon raqami"
              placeholder="Telefon raqami"
            />
            <FormDatePicker
              name="birthdate"
              control={form.control}
              label="Tug'ilgan kun"
              disabledDays={{ to: new Date() }}
            />
            <FormTextarea
              name="address"
              control={form.control}
              label="Manzil"
              placeholder="Manzil"
            />
            <div className="flex gap-2 justify-end">
              <Button
                type="button"
                variant={"outline"}
                onClick={() => setOpen()}
              >
                Bekor qilish
              </Button>
              <Button type="submit" variant={"default"}>
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
