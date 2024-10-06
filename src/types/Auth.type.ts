import { authSchema } from "@/schema/auth"
import { z } from "zod"
import { Response } from "./Other.type"

export interface AuthStore {
  token: string | null
  account: Account | null

  setToken: (token: string) => void
  setAccount: (account: Account) => void
  clearAuth: () => void
}

export type AuthType = z.infer<typeof authSchema>

export interface AuthResponse {
  success: boolean
  data: string
}

export type Account = {
  id: number;
  name: string;
  picture_url?: string | null;
}

export type GetUserDetailsResponse = Response & {
  data: {
    id: number;
    name: string;
    username: string;
    account: Account;
  }
}