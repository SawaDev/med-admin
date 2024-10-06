import * as React from "react";
import { LabelList, Pie, PieChart } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { DateRangeType } from "@/types/Other.type";
import useTherapies from "@/hooks/useTherapies";
import { endOfDay, startOfDay } from "date-fns";
import { generateChartConfig, toUTCString } from "@/lib/utils";
import { chartColors } from "@/constants";

export type PieChartTypes = {
  dates: DateRangeType;
};

const PieChartComponent: React.FC<PieChartTypes> = ({ dates }) => {
  const { getTherapyStatisticsQuery } = useTherapies();

  const startOfFromDateUTC = toUTCString(startOfDay(new Date(dates.from_date)));

  const endOfToDateUTC = toUTCString(endOfDay(new Date(dates.to_date)));

  const { data, isLoading } = getTherapyStatisticsQuery({
    from_date_time: startOfFromDateUTC,
    to_date_time: endOfToDateUTC,
  });

  const chartConfig = generateChartConfig(data ? data.data : [])

  if (isLoading) {
    return "Loading...";
  }

  return (
    <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[500px]">
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={
            data?.data
              ? data.data.map((d, index) => ({
                  ...d,
                  fill: chartColors[index % chartColors.length],
                }))
              : []
          }
          dataKey="percentage"
          nameKey="name"
          innerRadius={60}
          strokeWidth={0}
        >
          <LabelList
            dataKey="browser"
            className="fill-background"
            stroke="none"
            fontSize={12}
            formatter={(value: keyof typeof chartConfig) =>
              chartConfig[value]?.label
            }
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
};

export default PieChartComponent;
