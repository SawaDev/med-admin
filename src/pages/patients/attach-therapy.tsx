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
import { FC, useState } from "react";
import { SheetType } from "@/types/Other.type";
import { Button } from "@/components/ui/button";
import { FormSearchInput } from "@/components/form/FormSearchInput";
import { z } from "zod";
import AddDialog from "./add-dialog";
import usePatients from "@/hooks/usePatients";
import useTherapyTypes from "@/hooks/useTherapyTypes";
import useTherapies from "@/hooks/useTherapies";
import { createTherapySchema } from "@/schema/therapy";
import { FormSelect } from "@/components/form/FormSelect";
import { useDebounce } from "@/hooks/useDebounce";

const AttachTherapy: FC<SheetType> = ({ open, setOpen }) => {
  const [addPatient, setAddPatient] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string | undefined>();

  const debouncedQuery = useDebounce(searchQuery, 1000);

  const form = useForm<z.infer<typeof createTherapySchema>>({
    resolver: zodResolver(createTherapySchema),
  });

  const { getAllPatientsQuery } = usePatients();
  const { getAllTherapyTypesQuery } = useTherapyTypes();
  const { createTherapyMutation } = useTherapies();

  const createTherapy = createTherapyMutation();

  const {
    data: therapyTypes,
    isLoading: loadingTypes,
    isError: errorTypes,
  } = getAllTherapyTypesQuery();

  const {
    data: patients,
    isLoading: loadingPatients,
    isError: errorPatients,
  } = getAllPatientsQuery({
    size: 1,
    page: 1,
    search: debouncedQuery
  });

  const onSubmit = (values: z.infer<typeof createTherapySchema>) => {
    const formattedValues = {
      patient_id: Number(values.patient_id),
      type_id: Number(values.type_id),
      price_in_sum:
        therapyTypes?.data.find(
          (therapy) => therapy.id === Number(values.type_id)
        )?.price_in_sum ?? 0,
    };

    createTherapy.mutateAsync(formattedValues).then(() => setOpen(false));
  };

  const handleInputChange = (value: string | undefined) => {
    setSearchQuery(value);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <Form {...form}>
          <DialogHeader className="h-8">
            <DialogTitle>Bemorni xizmatga biriktirish</DialogTitle>
            <DialogDescription>
              Ma'lumotlarni to'ldirgan xolda, bemorni xizmatga biriktirishingiz
              mumkin
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3 mt-5"
          >
            {!errorPatients && (
              <FormSearchInput
                control={form.control}
                name="patient_id"
                label="Bemorni tanlang"
                placeholder="Bemorni tanlang"
                options={patients?.data ? patients.data.content.map((patient) => ({
                  label: patient.name,
                  value: patient.id.toString(),
                })) : []}
                handleNew={() => setAddPatient(true)}
                handleSearch={handleInputChange}
                loading={loadingPatients}
              />
            )}
            {!loadingTypes && !errorTypes && therapyTypes?.data && (
              <FormSelect 
                control={form.control}
                name="type_id"
                label="Bemorni tanlang"
                placeholder="Bemorni tanlang"
                options={therapyTypes.data.map((therapy) => ({
                  label: therapy.name,
                  value: therapy.id.toString(),
                }))}
              />
            )}
            

            <div className="flex gap-2 justify-end">
              <Button
                type="button"
                variant={"outline"}
                onClick={() => setOpen(false)}
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
      {addPatient && (
        <AddDialog open={addPatient} setOpen={() => setAddPatient(false)} />
      )}
    </Dialog>
  );
};

export default AttachTherapy;
