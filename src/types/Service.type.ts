import { createServiceSchema } from "@/schema/service";
import { z } from "zod";

export interface Service {
  id: number;
  name: string;
  price: number;
}

export type CreateService = z.infer<typeof createServiceSchema>