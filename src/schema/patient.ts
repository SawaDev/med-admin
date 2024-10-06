import { z } from "zod";

export const createPatientSchema = z.object({
  name: z.string({ required_error: "Ismini kiriting!" }),
  birthdate: z.string({ required_error: "Tug'ilgan kunini kiriting!" }),
  address: z.string({ required_error: "Manzilini kiriting!" }),
  phone_number: z.string({ required_error: "Telefon raqamini kiriting!" }),
})