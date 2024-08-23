import { createRoomSchema } from "@/schema/room";
import { z } from "zod";

export interface Room {
  id: number;
  name: string;
  price: number;
  type: "premium" | "standard"
}

export type CreateService = z.infer<typeof createRoomSchema>