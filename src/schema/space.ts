import { z } from "zod";

export const createSpaceSchema = z.object({
  name: z.string({ required_error: "Nomi ni kiriting!" }),
  price: z.number({ required_error: "Narxini ni kiriting!" }),
  room_id: z.string({ required_error: "Xonani tanlang!" }),
  status: z.enum(["booked", "empty"], { required_error: "Statusni tanlang!" })
})