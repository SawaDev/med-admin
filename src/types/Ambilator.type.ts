import { createAmbilatorSchema } from "@/schema/ambilator";
import { z } from "zod";

export interface Ambilator {
  id: number;
  name: string;
  price: number;
}

export type CreateAmbilator = z.infer<typeof createAmbilatorSchema>