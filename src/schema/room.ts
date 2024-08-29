import { z } from "zod";

export const createRoomSchema = z.object({
  name: z.string({ required_error: "Nomi ni kiriting!" }),
  type: z.enum(["premium", "standard"], { required_error: "Xona turini tanlang!" })
})