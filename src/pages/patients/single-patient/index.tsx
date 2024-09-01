import { FormDatePicker } from '@/components/form/FormDatePicker'
import { FormInput } from '@/components/form/FormInput'
import { FormTextarea } from '@/components/form/FormTextarea'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { createPatientSchema } from '@/schema/patient'
import { CreatePatient } from '@/types/Patient.type'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

const SinglePatient = () => {

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
    <div className='grid grid-cols-3 p-4 gap-3'>
      <Card className='col-span-2'>
        <CardHeader>
          <CardTitle>
            Bemor haqida
          </CardTitle>
          <CardDescription>
            Bemor haqidagi to'liq ma'lumotlarni quyoda bilib olishingiz mumkin
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='grid grid-cols-2 gap-3'>
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
              <div></div>
              <FormTextarea
                name='address'
                control={form.control}
                label="Manzil"
                placeholder="Manzil"
                className='col-span-2'
              />
              <div className='flex gap-2 justify-end col-span-2'>
                <Button type='submit' variant={"default"}>
                  Saqlash
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card className='col-span-1 h-fit'>
        <CardHeader>
          <CardTitle>
            Bronni bekor qilish
          </CardTitle>
          <CardDescription>
            Ushbu bemorning qilgan bronini bekor qilasizmi
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant={"destructive"}>
            Bekor qilish
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default SinglePatient