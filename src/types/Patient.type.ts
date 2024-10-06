import { createPatientSchema } from "@/schema/patient";
import { z } from "zod";
import { ListResponse, Response } from "./Other.type";

export interface Patient {
  id: number;
  name: string;
  birthdate: string;
  address: string;
  phone_number: string;
}

export type CreatePatient = z.infer<typeof createPatientSchema>

export type CreatePatientResponse = Response & {
  data: Patient;
}

export type GetAllPatientsResponse = ListResponse<Patient>