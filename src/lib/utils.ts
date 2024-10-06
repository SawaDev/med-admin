import { ChartConfig } from "@/components/ui/chart";
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

export const toUTCString = (date: Date) => {
  return new Date(date).toISOString();
};

const baseColors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export const generateChartConfig = (data: { id: number; name: string; percentage: number }[]) => {
  const chartConfig: ChartConfig = {};

  data.forEach((item, index) => {
    const color = baseColors[index % baseColors.length] || `hsl(${index * 36}, 100%, 50%)`;
    chartConfig[item.name] = {
      label: item.name,
      color,
    };
  });

  return chartConfig;
};
