import DynamicForm from '@/components/form/DynamicForm'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { createPatientSchema } from '@/schema/patient'
import { CreatePatient } from '@/types/Patient.type'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { fields } from './form-fields'
import { FC, useEffect } from 'react'
import { SheetType } from '@/types/Other.type'

type AddDialogProps = SheetType & {
  isEdit?: boolean
}

const AddDialog: FC<AddDialogProps> = ({ open, setOpen, isEdit }) => {
  const form = useForm<CreatePatient>({
    resolver: zodResolver(createPatientSchema),
  })

  useEffect(() => {
    form.reset({})
  }, [])

  const onSubmit = (values: CreatePatient) => {
    console.log(values)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <Form {...form}>
          <DialogHeader className='h-8'>
            <DialogTitle>Yangi bemorni kiritish</DialogTitle>
            <DialogDescription>Yangi bemorning ma'lumotlarini kiriting</DialogDescription>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DynamicForm
              control={form.control}
              fields={fields}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AddDialog