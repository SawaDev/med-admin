import { z } from "zod";

export const createAmbilatorSchema = z.object({
  service_id: z.string({ required_error: "Servis ni tanlang!" }),
  patient_id: z.number({ required_error: "Bemor ni tanlang!" }),
  price: z.number({ required_error: "Narx ni tanlang!" }),
  comment: z.string().optional()
})