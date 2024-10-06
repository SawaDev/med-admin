import { FormInput } from "@/components/form/FormInput";
import { FormSearchInput } from "@/components/form/FormSearchInput";
import { FormTextarea } from "@/components/form/FormTextarea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import usePatients from "@/hooks/usePatients";
import useTherapies from "@/hooks/useTherapies";
import useTherapyTypes from "@/hooks/useTherapyTypes";
import { createTherapySchema } from "@/schema/therapy";
import { SheetType } from "@/types/Other.type";
import { CreateTherapy } from "@/types/Therapy.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";

const Ambilator: FC<SheetType> = ({ open, setOpen }) => {
  const { getAllPatientsQuery } = usePatients();
  const { getAllTherapyTypesQuery } = useTherapyTypes();
  const { createTherapyMutation } = useTherapies();

  const createTherapy = createTherapyMutation();

  const {
    data: patients,
    isLoading: loadingPatients,
    isError: errorPatients,
  } = getAllPatientsQuery({ size: 100, page: 1 });

  const {
    data: therapyTypes,
    isLoading: loadingTherapyTypes,
    isError: errorTherapyTypes,
  } = getAllTherapyTypesQuery();

  const form = useForm<CreateTherapy>({
    resolver: zodResolver(createTherapySchema),
  });

  const onSubmit = (values: CreateTherapy) => {
    const filteredValue = {
      ...values,
      patient_id: Number(values.patient_id),
      type_id: Number(values.type_id),
    };

    createTherapy.mutateAsync(filteredValue).then(() => setOpen(false));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ambilator bemor</DialogTitle>
          <DialogDescription>
            Yangi ambilator bemorni kiriting
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            {!loadingTherapyTypes &&
              !errorTherapyTypes &&
              therapyTypes?.data && (
                <FormSearchInput
                  name="type_id"
                  control={form.control}
                  label="Servis"
                  placeholder="Servisni tanlang..."
                  options={therapyTypes.data.map((therapyType) => ({
                    label: therapyType.name,
                    value: therapyType.id.toString(),
                  }))}
                />
              )}
            {!loadingPatients && !errorPatients && patients?.data && (
              <FormSearchInput
                name="patient_id"
                control={form.control}
                label="Bemor"
                placeholder="Bemorni tanlang..."
                options={patients.data.content.map((patient) => ({
                  label: patient.name,
                  value: patient.id.toString(),
                }))}
              />
            )}
            <FormInput
              name="price_in_sum"
              control={form.control}
              label="Narx"
              placeholder="Narxni kiriting"
              type="number"
            />
            <FormTextarea
              name="comment"
              control={form.control}
              label="Komment"
              placeholder="Komment qoldiring"
            />
            <div className="flex gap-2 justify-end col-span-2">
              <Button
                onClick={() => setOpen(false)}
                type="button"
                variant={"outline"}
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

export default Ambilator;
