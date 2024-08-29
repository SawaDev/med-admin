import { createBookSchema } from "@/schema/book";
import { z } from "zod";

export interface Book {
  id: number;
  room_id: string;
  space_id: number;
  date: string;
}

export type CreateBook = z.infer<typeof createBookSchema>