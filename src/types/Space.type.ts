import { createSpaceSchema } from "@/schema/space";
import { z } from "zod";

export interface Space {
  id: number;
  name: string;
  price: number;
  room_id: number;
  status: "booked" | "empty"
}

export type CreateSpace = z.infer<typeof createSpaceSchema>