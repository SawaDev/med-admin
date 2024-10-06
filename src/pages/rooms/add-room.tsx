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
import { CreateRoom, Room } from "@/types/Room.type";
import { createRoomSchema } from "@/schema/room";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/form/FormInput";
import { FormSelect } from "@/components/form/FormSelect";
import useRooms from "@/hooks/useRooms";

type AddRoomProps = SheetType & {
  isEdit?: Room;
};

const AddRoom: FC<AddRoomProps> = ({ open, setOpen, isEdit }) => {
  const { createRoomMutation, updateRoomMutation } = useRooms();

  const createRoom = createRoomMutation();
  const updateRoom = updateRoomMutation(isEdit?.id);

  const form = useForm<CreateRoom>({
    resolver: zodResolver(createRoomSchema),
  });

  useEffect(() => {
    if (isEdit) {
      form.reset({
        name: isEdit.name,
        type: isEdit.type.id,
      });
    }
  }, [isEdit]);

  const onSubmit = (values: CreateRoom) => {
    if (isEdit) {
      updateRoom.mutateAsync(values).then(() => setOpen(false));
    } else {
      createRoom.mutateAsync(values).then(() => setOpen(false));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <Form {...form}>
          <DialogHeader className="h-8">
            <DialogTitle>
              {isEdit
                ? "Xona ma'lumotlarini o'zgartirish"
                : "Yangi xona kiritish"}
            </DialogTitle>
            {!isEdit && (
              <DialogDescription>
                Yangi xonaning ma'lumotlarini kiriting
              </DialogDescription>
            )}
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormInput
              name="name"
              control={form.control}
              label="Nomi"
              placeholder="Nomi"
            />
            <FormSelect
              name="type"
              control={form.control}
              options={[
                {
                  value: "standard",
                  label: "Standard",
                },
                {
                  value: "vip",
                  label: "VIP",
                },
              ]}
              label="Xona turi"
              placeholder="Xona turi"
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

export default AddRoom;
