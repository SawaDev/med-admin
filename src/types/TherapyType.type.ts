import { createTherapyTypeSchema } from "@/schema/therapy-type";
import { z } from "zod";
import { Response } from "./Other.type";

export interface TherapyType {
  name: string;
  price_in_sum: number;
  id: number;
}

export type CreateTherapyType = z.infer<typeof createTherapyTypeSchema>;

export type GetAllTherapyTypesResponse = Response & {
  data: TherapyType[]
}