import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { createPatientSchema } from '@/schema/patient'
import { CreatePatient } from '@/types/Patient.type'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FC, useEffect } from 'react'
import { SheetType } from '@/types/Other.type'
import { Button } from '@/components/ui/button'
import { FormInput } from '@/components/form/FormInput'
import { FormTextarea } from '@/components/form/FormTextarea'
import { FormDatePicker } from '@/components/form/FormDatePicker'

type AddDialogProps = SheetType & {
  isEdit?: boolean
}

const AddDialog: FC<AddDialogProps> = ({ open, setOpen }) => {
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
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
            <FormInput
              name='name'
              control={form.control}
              label="Ismi"
              placeholder="Ismi"
            />
            <FormInput
              name='surname'
              control={form.control}
              label="Familyasi"
              placeholder="Familyasi"
            />
            <FormDatePicker
              name='birthdate'
              control={form.control}
              label="Tug'ilgan kun"
              disabledDays={{ to: new Date() }}
            />
            <FormTextarea
              name='address'
              control={form.control}
              label="Manzil"
              placeholder="Manzil"
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

export default AddDialog