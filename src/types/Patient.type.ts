import { createPatientSchema } from "@/schema/patient";
import { z } from "zod";

export interface Patient {
  id: number;
  name: string;
  surname: string;
  birthdate: string;
  address: string;
}

export type CreatePatient = z.infer<typeof createPatientSchema>