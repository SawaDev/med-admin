import { createRoomSchema } from "@/schema/room";
import { z } from "zod";

export interface Room {
  id: number;
  name: string;
  empty_spaces: number;
  type: "premium" | "standard"
}

export type GetAllRoomsType = {
  id: number;
  name: string;
  empty_spaces: number;
  type: "premium" | "standard",
  spaces: {
    id: number
    name: string
    price: number
    status: "booked" | "empty"
    available_in?: string
  }[]
}

export type CreateRoom = z.infer<typeof createRoomSchema>