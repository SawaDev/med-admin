import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatNumberComma = (number: number | null, minFraction?: number, maxFraction?: number): string => {
  if (!number) return "0";
  return number.toLocaleString("en-US", {
    minimumFractionDigits: minFraction ?? 0,
    maximumFractionDigits: maxFraction ?? 4
  })
}