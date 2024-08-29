import { z } from "zod";

export const createBookSchema = z.object({
  date: z.string({ required_error: "Kunni kiriting!" }),
  room_id: z.string({ required_error: "Xonani tanlang!" }),
  space_id: z.string({ required_error: "Joyni tanlang!" }),
})