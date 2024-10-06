import { createRoomSchema } from "@/schema/room";
import { z } from "zod";
import { Response } from "./Other.type";

export interface Room {
  id: number;
  name: string;
  type: {
    id: "vip" | "standard";
    name: string;
  };
  places_count: number;
}

export type GetAllRoomsResponse = Response & {
  data: Room[]
}

export type CreateRoom = z.infer<typeof createRoomSchema>