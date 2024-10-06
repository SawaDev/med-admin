import { z } from "zod";

export const createTherapySchema = z.object({
  comment: z.string().optional(),
  patient_id: z.string({ required_error: "Bemorni kiriting!" }),
  type_id: z.string({ required_error: "Turini kiriting!" }),
  price_in_sum: z.number({ required_error: "Narxini kiriting!" }),
});