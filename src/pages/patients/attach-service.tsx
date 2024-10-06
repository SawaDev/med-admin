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
import AddRoom from "../rooms/add-room";
import AddDialog from "./add-dialog";
import { FormDateRange } from "@/components/form/FormDateRange";
import { createBookingSchema } from "@/schema/bed";
import useRooms from "@/hooks/useRooms";
import usePatients from "@/hooks/usePatients";
import useBeds from "@/hooks/useBeds";
import AddBed from "../rooms/add-bed";
import { differenceInDays, format } from "date-fns";

const AttachServiceDialog: FC<SheetType> = ({ open, setOpen }) => {
  const [addRoom, setAddRoom] = useState<boolean>(false);
  const [addBed, setAddBed] = useState<number | undefined>(undefined);
  const [addPatient, setAddPatient] = useState<boolean>(false);

  const form = useForm<z.infer<typeof createBookingSchema>>({
    resolver: zodResolver(createBookingSchema),
  });

  const roomId = form.watch("room_id");

  const { getAllPatientsQuery } = usePatients();
  const { getAllRoomsQuery } = useRooms();
  const { getRoomBedsQuery, createBedBookingMutation } = useBeds();

  const createBedBooking = createBedBookingMutation(form.getValues("bed_id"));

  const {
    data: rooms,
    isLoading: loadingRooms,
    isError: errorRooms,
  } = getAllRoomsQuery();

  const {
    data: patients,
    isLoading: loadingPatients,
    isError: errorPatients,
  } = getAllPatientsQuery({
    size: 100,
    page: 1,
  });

  const {
    data: beds,
    isLoading: loadingBeds,
    isError: errorBeds,
  } = getRoomBedsQuery(Number(roomId));

  const onSubmit = (values: z.infer<typeof createBookingSchema>) => {
    console.log('values', values)
    const duration_in_days =
      values.dates.from && !values.dates.to
        ? 1
        : differenceInDays(values.dates.to, values.dates.from) + 1;

    const formattedValues = {
      patient_id: Number(values.patient_id),
      start_date: format(new Date(values.dates.from), "yyyy-MM-dd"),
      duration_in_days,
    };

    createBedBooking.mutateAsync(formattedValues).then(() => setOpen(false));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <Form {...form}>
          <DialogHeader className="h-8">
            <DialogTitle>Bemorni xonaga biriktirish</DialogTitle>
            <DialogDescription>
              Ma'lumotlarni to'ldirgan xolda, bemorni xonaga biriktirishingiz
              mumkin
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3 mt-3"
          >
            {!loadingPatients && !errorPatients && patients?.data && (
              <FormSearchInput
                control={form.control}
                name="patient_id"
                label="Bemorni tanlang"
                placeholder="Bemorni tanlang"
                options={patients.data.content.map((patient) => ({
                  label: patient.name,
                  value: patient.id.toString(),
                }))}
                handleNew={() => setAddPatient(true)}
              />
            )}
            {!loadingRooms && !errorRooms && rooms?.data && (
              <FormSearchInput
                control={form.control}
                name="room_id"
                label="Xonani tanlang"
                placeholder="Xonani tanlang"
                options={rooms.data.map((room) => ({
                  label: room.name,
                  value: room.id.toString(),
                }))}
                handleNew={() => setAddRoom(true)}
              />
            )}
            {!loadingBeds && !errorBeds && beds?.data && (
              <FormSearchInput
                control={form.control}
                name="bed_id"
                label="Yotoqni tanlang"
                placeholder="Yotoqni tanlang"
                options={beds.data.map((room) => ({
                  label: room.name,
                  value: room.id.toString(),
                }))}
                handleNew={() =>
                  setAddBed(
                    form.getValues("room_id")
                      ? Number(form.getValues("room_id"))
                      : undefined
                  )
                }
              />
            )}
            <FormDateRange
              control={form.control}
              name="dates"
              label="Kunni kiriting"
              // disabledDays={[
              //   new Date(2024, 8, 12),
              //   new Date(2024, 8, 2),
              //   {
              //     after: new Date(2024, 7, 20),
              //     before: new Date(2024, 7, 25),
              //   },
              // ]}
              numberOfMonths={2}
            />

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
      {addRoom && <AddRoom open={addRoom} setOpen={setAddRoom} />}
      {addBed && (
        <AddBed
          open={!!addBed}
          setOpen={() => setAddBed(undefined)}
          handleAddRoom={() => setAddRoom(true)}
          room_id={form.getValues("room_id")}
        />
      )}
      {addPatient && (
        <AddDialog open={addPatient} setOpen={() => setAddPatient(false)} />
      )}
    </Dialog>
  );
};

export default AttachServiceDialog;
