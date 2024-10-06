import { z } from "zod";

export const createBedSchema = z.object({
  name: z.string({ required_error: "Nomi ni kiriting!" }),
  price_in_sum: z.number({ required_error: "Narxini ni kiriting!" }),
  room_id: z.string({ required_error: "Xonani tanlang!" }),
});

export const createBookingSchema = z.object({
  patient_id: z.string({ required_error: "Bemorni kiriting!" }),
  room_id: z.string({ required_error: "Xonani kiriting!" }),
  bed_id: z.string({ required_error: "Yotoqni kiriting!" }),
  dates: z.object({
    from: z.any({ required_error: "Kunni kiriting!" }),
    to: z.any({ required_error: "Kunni kiriting!" }).optional(),
  })
});
