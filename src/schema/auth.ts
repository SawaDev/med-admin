import { z } from "zod";

export const authSchema = z.object({
  username: z.string({ required_error: "Username ni kiriting!" }),
  password: z.string({ required_error: "Password ni kiriting!" }),
})