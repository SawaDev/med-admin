import DatePickerWithRange from "@/components/date-range";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { dashboardTabs, dateRangesByPeriod } from "@/constants";
import useSessionStorage from "@/hooks/useSessionStorage";
import { formatNumberComma } from "@/lib/utils";
import { DateRangeType } from "@/types/Other.type";
import { format } from "date-fns";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import PieChartComponent from "./pie-chart";
import useTherapies from "@/hooks/useTherapies";
import { Skeleton } from "@/components/ui/skeleton";

const Dashboards = () => {
  const [tabs, setTabs] = useSessionStorage<string>("dashboards-tabs", "daily");
  const [date, setDate] = useState<DateRangeType>(dateRangesByPeriod["daily"]);
  const [dashboardType, setDashboardType] = useState<string>("table");

  const { getTherapiesQuery } = useTherapies();

  const { data, isLoading } = getTherapiesQuery({
    size: 100,
    page: 1,
    ...date,
  });

  const handleDateChange = (range: DateRange | undefined) => {
    setDate((prev) => ({
      ...prev,
      from_date: range?.from ? format(range.from, "yyyy-MM-dd") : "",
      to_date: range?.to ? format(range.to, "yyyy-MM-dd") : "",
    }));
  };

  const handleTabsChange = (value: string) => {
    setTabs(value);
    if (
      value === "daily" ||
      value === "weekly" ||
      value === "monthly" ||
      value === "yearly"
    ) {
      setDate(dateRangesByPeriod[value]);
    }
    return;
  };

  if (isLoading) {
    return (
      <div className="w-full space-y-2">
        {Array.from({ length: 14 }).map((_, index) => (
          <Skeleton className="h-7 w-full" key={index}/>
        ))}
      </div>
    );
  }

  return (
    <div className="p-4">
      <Tabs
        defaultValue={tabs}
        value={tabs}
        onValueChange={(value) => handleTabsChange(value)}
      >
        <div className="w-full flex justify-between">
          <TabsList className="">
            {dashboardTabs.map((tab) => (
              <TabsTrigger
                className="min-w-20 text-center"
                key={tab.value}
                value={tab.value}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs === "custom" && (
            <DatePickerWithRange
              defaultValue={date}
              onChange={handleDateChange}
            />
          )}
        </div>
        {dashboardTabs.map((tab) => (
          <TabsContent
            key={tab.value}
            value={tab.value}
            className="w-full h-full"
          >
            <Tabs
              className="mt-4"
              value={dashboardType}
              onValueChange={setDashboardType}
            >
              <div className="w-full flex justify-between items-center">
                <TabsList>
                  <TabsTrigger value="table">Jadval</TabsTrigger>
                  <TabsTrigger value="pie-chart">Diagramma</TabsTrigger>
                </TabsList>
                {/* {dashboardType === "table" && (
                  <Button variant={"secondary"} className="space-x-2">
                    <Download className="h-4 w-4" />
                    <span>Excel ga yuklash</span>
                  </Button>
                )} */}
              </div>
              <TabsContent className="mt-2" value="table">
                <Card>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Bemor ismi</TableHead>
                          <TableHead>Muolaja turi</TableHead>
                          <TableHead>To'lov summasi</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {data?.data && data.data.content.length > 0 ? (
                          <>
                            {data?.data.content.map((d, index) => (
                              <TableRow key={index}>
                                <TableCell>{d.patient_name}</TableCell>
                                <TableCell>{d.type_name}</TableCell>
                                <TableCell>
                                  {formatNumberComma(d.price_in_sum)}
                                </TableCell>
                              </TableRow>
                            ))}
                          </>
                        ) : (
                          <TableCell colSpan={99}>Hech narsa yo'q</TableCell>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="pie-chart">
                <PieChartComponent dates={date} />
              </TabsContent>
            </Tabs>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Dashboards;
