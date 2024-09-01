import { DateRangeType, Option } from "./types/Other.type";
import { format, subDays, subMonths, subWeeks, subYears } from "date-fns"

export const dashboardTabs: Option[] = [
  {
    value: "daily",
    label: "Kun"
  },
  {
    value: "weekly",
    label: "Hafta"
  },
  {
    value: "monthly",
    label: "Oy"
  },
  {
    value: "yearly",
    label: "Yil"
  },
  {
    value: "custom",
    label: "Maxsus"
  }
]

interface DateRangesByPeriodType {
  daily: DateRangeType,
  weekly: DateRangeType,
  monthly: DateRangeType,
  yearly: DateRangeType
}

export const dateRangesByPeriod: DateRangesByPeriodType = {
  daily: {
    from_date: format(subDays(new Date(), 1), "yyyy-MM-dd HH:mm:ss"),
    to_date: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
  },
  weekly: {
    from_date: format(subWeeks(new Date(), 1), "yyyy-MM-dd HH:mm:ss"),
    to_date: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
  },
  monthly: {
    from_date: format(subMonths(new Date(), 1), "yyyy-MM-dd HH:mm:ss"),
    to_date: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
  },
  yearly: {
    from_date: format(subYears(new Date(), 1), "yyyy-MM-dd HH:mm:ss"),
    to_date: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
  },
}