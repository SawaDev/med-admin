import { z } from "zod";

export const createServiceSchema = z.object({
  name: z.string({ required_error: "Ismini ni kiriting!" }),
  price: z.number({ required_error: "Narxini ni kiriting!" }),
})

export const attachServiceSchema = z.object({
  room_id: z.string({ required_error: "Joyni tanlang" }),
  patient_id: z.string({ required_error: "Bemorni tanlang" }),
  dates: z.object(
    {
      from: z.date().optional(),
      to: z.date().optional()
    },
    { required_error: "Kunni tanlang!" }),
})