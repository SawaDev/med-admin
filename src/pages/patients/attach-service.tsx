import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FC, useState } from 'react'
import { Option, SheetType } from '@/types/Other.type'
import { Button } from '@/components/ui/button'
import { FormSearchInput } from '@/components/form/FormSearchInput'
import { attachServiceSchema } from '@/schema/service'
import { z } from 'zod'
import AddRoom from '../rooms/add-room'
import AddDialog from './add-dialog'
import { FormDateRange } from '@/components/form/FormDateRange'

const AttachServiceDialog: FC<SheetType> = ({ open, setOpen }) => {
  const [addRoom, setAddRoom] = useState<boolean>(false)
  const [addPatient, setAddPatient] = useState<boolean>(false)

  const form = useForm<z.infer<typeof attachServiceSchema>>({
    resolver: zodResolver(attachServiceSchema),
  })

  const onSubmit = (values: z.infer<typeof attachServiceSchema>) => {
    console.log(values)
  }

  const serviceOptions: Option[] = [
    {
      value: "1",
      label: "Service 1",
    },
    {
      value: "2",
      label: "Service 2",
    },
  ]

  const patientOptions: Option[] = [
    {
      value: "1",
      label: "Patient 1",
    },
    {
      value: "2",
      label: "Patient 2",
    },
  ]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <Form {...form}>
          <DialogHeader className='h-8'>
            <DialogTitle>Yangi bemorni kiritish</DialogTitle>
            <DialogDescription>Yangi bemorning ma'lumotlarini kiriting</DialogDescription>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3 mt-3'>
            <FormSearchInput
              control={form.control}
              name="room_id"
              label="Xonani tanlang"
              placeholder="Xonani tanlang"
              options={serviceOptions}
              handleNew={() => setAddRoom(true)}
            />
            <FormSearchInput
              control={form.control}
              name="patient_id"
              label="Bemorni tanlang"
              placeholder="Bemorni tanlang"
              options={patientOptions}
              handleNew={() => setAddPatient(true)}
            />
            <FormDateRange
              control={form.control}
              name="range"
              label="Select a date range"
              disabledDays={{
                from: new Date(2023, 0, 1),
                to: new Date(2023, 11, 31),
              }}
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
      {addRoom && (
        <AddRoom
          open={addRoom}
          setOpen={setAddRoom}
        />
      )}
      {addPatient && (
        <AddDialog
          open={addPatient}
          setOpen={setAddPatient}
        />
      )}
    </Dialog>
  )
}

export default AttachServiceDialog