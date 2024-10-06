import { z } from "zod";

export const createTherapyTypeSchema = z.object({
  name: z.string({ required_error: "Ismini ni kiriting!" }),
  price_in_sum: z.number({ required_error: "Narxini ni kiriting!" }),
})