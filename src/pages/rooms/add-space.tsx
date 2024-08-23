import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FC, useEffect } from 'react'
import { Option, SheetType } from '@/types/Other.type'
import { CreateService } from '@/types/Service.type'
import { FormInput } from '@/components/form/FormInput'
import { FormSearchInput } from '@/components/form/FormSearchInput'
import { createSpaceSchema } from '@/schema/space'
import { CreateSpace } from '@/types/Space.type'

type AddSpaceProps = SheetType & {
  isEdit?: boolean
  handleAddRoom: () => void
}

const AddSpace: FC<AddSpaceProps> = ({ open, setOpen, isEdit, handleAddRoom }) => {
  const form = useForm<CreateSpace>({
    resolver: zodResolver(createSpaceSchema),
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

  const onSubmit = (values: CreateService) => {
    console.log(values)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <Form {...form}>
          <DialogHeader className='h-8'>
            <DialogTitle>Yangi joy kiritish</DialogTitle>
            <DialogDescription>Yangi joyning ma'lumotlarini kiriting</DialogDescription>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
            <FormInput
              control={form.control}
              name="name"
              label="Nomi"
              placeholder="Nomi"
            />
            <FormSearchInput
              control={form.control}
              name="room_id"
              label="Xonani tanlang"
              placeholder="Xonani tanlang"
              options={roomOptions}
              handleNew={handleAddRoom}
              handleChange={(value) => form.setValue('room_id', value)}
            />
            <FormInput
              control={form.control}
              name="price"
              label="Narxi"
              placeholder="Narxi"
              type='number'
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AddSpace