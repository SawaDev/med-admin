import { z } from "zod";

export const createPatientSchema = z.object({
  name: z.string({ required_error: "Ismini ni kiriting!" }),
  surname: z.string({ required_error: "Familya ni kiriting!" }),
  birthdate: z.string({ required_error: "Tug'ilgan kunni kiriting!" }),
  address: z.string({ required_error: "Manzil ni kiriting!" }),
})