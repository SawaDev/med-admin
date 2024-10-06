import { createBedSchema } from "@/schema/bed";
import { z } from "zod";
import { Response } from "./Other.type";

export interface Bed {
  id: number;
  name: string;
  status: {
    name: string;
    color: string;
  };
  price_in_sum: number;
  booked_until: string;
}

export type GetRoomBedsReponse = Response & {
  data: Bed[]
}

export type CreateBed = z.infer<typeof createBedSchema>;

export type CreateBookingType = {
  patient_id: number;
  start_date: string;
  duration_in_days: number;
}