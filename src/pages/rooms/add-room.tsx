import DynamicForm from '@/components/form/DynamicForm'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { addRoomFields } from './form-fields'
import { FC, useEffect } from 'react'
import { SheetType } from '@/types/Other.type'
import { CreateService } from '@/types/Service.type'
import { createServiceSchema } from '@/schema/service'

type AddRoomProps = SheetType & {
  isEdit?: boolean
}

const AddRoom: FC<AddRoomProps> = ({ open, setOpen, isEdit }) => {
  const form = useForm<CreateService>({
    resolver: zodResolver(createServiceSchema),
  })

  useEffect(() => {
    form.reset({})
  }, [])

  const onSubmit = (values: CreateService) => {
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
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DynamicForm
              control={form.control}
              fields={addRoomFields}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AddRoom