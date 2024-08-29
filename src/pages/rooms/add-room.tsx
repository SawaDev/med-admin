import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FC, useEffect } from 'react'
import { SheetType } from '@/types/Other.type'
import { CreateRoom } from '@/types/Room.type'
import { createRoomSchema } from '@/schema/room'
import { Button } from '@/components/ui/button'
import { FormInput } from '@/components/form/FormInput'
import { FormSelect } from '@/components/form/FormSelect'

type AddRoomProps = SheetType & {
  isEdit?: boolean,
}

const AddRoom: FC<AddRoomProps> = ({ open, setOpen }) => {
  const form = useForm<CreateRoom>({
    resolver: zodResolver(createRoomSchema),
  })

  useEffect(() => {
    form.reset({})
  }, [])

  const onSubmit = (values: CreateRoom) => {
    console.log(values)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <Form {...form}>
          <DialogHeader className='h-8'>
            <DialogTitle>Yangi xona kiritish</DialogTitle>
            <DialogDescription>Yangi xonaning ma'lumotlarini kiriting</DialogDescription>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
            <FormInput
              name='name'
              control={form.control}
              label="Nomi"
              placeholder="Nomi"
            />
            <FormSelect
              name='type'
              control={form.control}
              options={[
                {
                  value: "standard",
                  label: "Standart"
                },
                {
                  value: "premium",
                  label: "Premium"
                }
              ]}
              label="Xona turi"
              placeholder="Xona turi"
            />
            <div className='flex gap-2 justify-end'>
              <Button type='button' variant={"outline"} onClick={() => setOpen(false)}>
                Bekor qilish
              </Button>
              <Button type='submit' variant={"default"}>
                Saqlash
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AddRoom