import { FormInput } from '@/components/form/FormInput'
import { FormSearchInput } from '@/components/form/FormSearchInput'
import { FormTextarea } from '@/components/form/FormTextarea'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { createAmbilatorSchema } from '@/schema/ambilator'
import { CreateAmbilator } from '@/types/Ambilator.type'
import { Option, SheetType } from '@/types/Other.type'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC } from 'react'
import { useForm } from 'react-hook-form'

const Ambilator: FC<SheetType> = ({ open, setOpen }) => {

  const form = useForm<CreateAmbilator>({
    resolver: zodResolver(createAmbilatorSchema),
  })

  const onSubmit = (values: CreateAmbilator) => {
    console.log(values)
  }

  const serviceOptions: Option[] = [
    {
      value: '1',
      label: 'Service 1'
    },
    {
      value: '2',
      label: 'Service 2'
    }
  ]

  const patientOptions: Option[] = [
    {
      value: '1',
      label: 'Patient 1'
    },
    {
      value: '2',
      label: 'Patient 2'
    }
  ]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Ambilator bemor
          </DialogTitle>
          <DialogDescription>
            Yangi ambilator bemorni kiriting
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-3'>
            <FormSearchInput
              name='service_id'
              control={form.control}
              label="Servis"
              placeholder="Servisni tanlang..."
              options={serviceOptions}
            />
            <FormSearchInput
              name='patient_id'
              control={form.control}
              label="Bemor"
              placeholder="Bemorni tanlang..."
              options={patientOptions}
            />
            <FormInput
              name='price'
              control={form.control}
              label="Narx"
              placeholder="Narxni kiriting"
              type='number'
            />
            <FormTextarea
              name='comment'
              control={form.control}
              label="Komment"
              placeholder="Komment qoldiring"
            />
            <div className='flex gap-2 justify-end col-span-2'>
              <Button onClick={() => setOpen(false)} type='button' variant={"outline"}>
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

export default Ambilator