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
import { FC, useEffect } from "react";
import { SheetType } from "@/types/Other.type";
import { FormInput } from "@/components/form/FormInput";
import { FormSearchInput } from "@/components/form/FormSearchInput";
import { Button } from "@/components/ui/button";
import { Bed, CreateBed } from "@/types/Bed.type";
import { createBedSchema } from "@/schema/bed";
import useRooms from "@/hooks/useRooms";
import useBeds from "@/hooks/useBeds";

type AddBedProps = SheetType & {
  isEdit?: Bed;
  handleAddRoom?: () => void;
  room_id?: string;
};

const AddBed: FC<AddBedProps> = ({
  open,
  setOpen,
  handleAddRoom,
  isEdit,
  room_id,
}) => {
  const { getAllRoomsQuery } = useRooms();
  const { createBedMutation } = useBeds();

  const createBed = createBedMutation();

  const { data, isLoading, isError } = getAllRoomsQuery();

  const form = useForm<CreateBed>({
    resolver: zodResolver(createBedSchema),
  });

  useEffect(() => {
    if (isEdit && room_id) {
      form.reset({
        name: isEdit.name,
        room_id: room_id,
        price_in_sum: isEdit.price_in_sum,
      });
    } else if (room_id) {
      form.reset({
        room_id,
      });
    }
  }, [isEdit, room_id]);

  const onSubmit = (values: CreateBed) => {
    createBed.mutateAsync(values).then(() => setOpen(false))
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <Form {...form}>
          <DialogHeader className="h-8">
            <DialogTitle>Yangi yotoqni kiritish</DialogTitle>
            <DialogDescription>
              Yangi yotoqning ma'lumotlarini kiriting
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormInput
              control={form.control}
              name="name"
              label="Nomi"
              placeholder="Nomi"
            />
            {!isLoading && !isError && data && !room_id && (
              <FormSearchInput
                control={form.control}
                name="room_id"
                label="Xonani tanlang"
                placeholder="Xonani tanlang"
                options={data.data.map((room) => ({
                  label: room.name,
                  value: room.id.toString(),
                }))}
                handleNew={handleAddRoom}
              />
            )}
            <FormInput
              control={form.control}
              name="price_in_sum"
              label="Narxi"
              placeholder="Narxi"
              type="number"
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
    </Dialog>
  );
};

export default AddBed;
