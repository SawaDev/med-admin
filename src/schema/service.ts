import { z } from "zod";

export const createServiceSchema = z.object({
  name: z.string({ required_error: "Ismini ni kiriting!" }),
  price: z.number({ required_error: "Narxini ni kiriting!" }),
})