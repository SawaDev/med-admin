import * as React from "react"
import { Label, Pie, PieChart } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A donut chart with text"

const chartData = [
  { services: "EKG", percentage: 14, fill: "var(--color-EKG)" },
  { services: "Service-1", percentage: 32, fill: "var(--color-Service-1)" },
  { services: "Service-2", percentage: 27, fill: "var(--color-Service-2)" },
  { services: "Service-3", percentage: 7, fill: "var(--color-Service-3)" },
  { services: "Boshqa", percentage: 20, fill: "var(--color-Boshqa)" },
]

const chartConfig = {
  percentage: {
    label: "Foiz",
  },
  EKG: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  "Service-1": {
    label: "Service-1",
    color: "hsl(var(--chart-2))",
  },
  "Service-2": {
    label: "Service-2",
    color: "hsl(var(--chart-3))",
  },
  "Service-3": {
    label: "Service-3",
    color: "hsl(var(--chart-4))",
  },
  "Boshqa": {
    label: "Boshqa",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export function Component() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.percentage, 0)
  }, [])

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[400px]"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="percentage"
          nameKey="services"
          innerRadius={60}
          strokeWidth={5}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-3xl font-bold"
                    >
                      {totalVisitors.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      Foiz
                    </tspan>
                  </text>
                )
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  )
}
