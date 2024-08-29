import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FC, useEffect } from 'react'
import { Option, SheetType } from '@/types/Other.type'
import { FormInput } from '@/components/form/FormInput'
import { FormSearchInput } from '@/components/form/FormSearchInput'
import { CreateBook } from '@/types/Book.type'
import { createBookSchema } from '@/schema/book'
import { Button } from '@/components/ui/button'

type BookDialogProps = SheetType & {
  isEdit?: boolean
  handleAddRoom: () => void
}

const BookDialog: FC<BookDialogProps> = ({ open, setOpen, handleAddRoom }) => {
  const form = useForm<CreateBook>({
    resolver: zodResolver(createBookSchema),
  })

  useEffect(() => {
    form.reset({})
  }, [])

  const roomOptions: Option[] = [
    {
      value: "1",
      label: "Room 1",
    },
    {
      value: "2",
      label: "Room 2",
    },
  ]

  const spaceOptions: Option[] = [
    {
      value: "1",
      label: "Space 1",
    },
    {
      value: "2",
      label: "Space 2",
    },
  ]

  const onSubmit = (values: CreateBook) => {
    console.log(values)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <Form {...form}>
          <DialogHeader className='h-8'>
            <DialogTitle>Joy band qilish</DialogTitle>
            <DialogDescription>Joy band qilish uchun quyidagi ma'lumotlarni to'ldiring</DialogDescription>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3 pt-3'>
            <FormSearchInput
              control={form.control}
              name="room_id"
              label="Xonani tanlang"
              placeholder="Xonani tanlang"
              options={roomOptions}
              handleNew={handleAddRoom}
            />
            <FormSearchInput
              control={form.control}
              name="space_id"
              label="Joyni tanlang"
              placeholder="Joyni tanlang"
              options={spaceOptions}
              handleNew={handleAddRoom}
            />
            <FormInput
              control={form.control}
              name="price"
              label="Narxi"
              placeholder="Narxi"
              type='number'
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

export default BookDialog