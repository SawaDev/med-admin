import { DateRangeType, Option } from "./types/Other.type";
import { format, subMonths, subWeeks, subYears } from "date-fns";

export const dashboardTabs: Option[] = [
  {
    value: "daily",
    label: "Kun",
  },
  {
    value: "weekly",
    label: "Hafta",
  },
  {
    value: "monthly",
    label: "Oy",
  },
  {
    value: "yearly",
    label: "Yil",
  },
  {
    value: "custom",
    label: "Maxsus",
  },
];

interface DateRangesByPeriodType {
  daily: DateRangeType;
  weekly: DateRangeType;
  monthly: DateRangeType;
  yearly: DateRangeType;
}

export const dateRangesByPeriod: DateRangesByPeriodType = {
  daily: {
    from_date: format(new Date(), "yyyy-MM-dd"),
    to_date: format(new Date(), "yyyy-MM-dd"),
  },
  weekly: {
    from_date: format(subWeeks(new Date(), 1), "yyyy-MM-dd"),
    to_date: format(new Date(), "yyyy-MM-dd"),
  },
  monthly: {
    from_date: format(subMonths(new Date(), 1), "yyyy-MM-dd"),
    to_date: format(new Date(), "yyyy-MM-dd"),
  },
  yearly: {
    from_date: format(subYears(new Date(), 1), "yyyy-MM-dd"),
    to_date: format(new Date(), "yyyy-MM-dd"),
  },
};

export const chartColors = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))"] 