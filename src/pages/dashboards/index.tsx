import DatePickerWithRange from "@/components/date-range"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { dashboardTabs, dateRangesByPeriod } from "@/constants"
import useSessionStorage from "@/hooks/useSessionStorage"
import { formatNumberComma } from "@/lib/utils"
import { DateRangeType } from "@/types/Other.type"
import { format } from "date-fns"
import { Download } from "lucide-react"
import { useState } from "react"
import { DateRange } from "react-day-picker"
import { Component } from "./pie-chart"

const Dashboards = () => {
  const [tabs, setTabs] = useSessionStorage<string>("dashboards-tabs", "daily")
  const [date, setDate] = useSessionStorage<DateRangeType>("dashboards-date", dateRangesByPeriod["daily"])
  const [dashboardType, setDashboardType] = useState<string>("table")

  const handleDateChange = (range: DateRange | undefined) => {
    setDate((prev) => ({
      ...prev,
      from_date: range?.from ? format(range.from, "yyyy-MM-dd HH:mm:ss") : "",
      to_date: range?.to ? format(range.to, "yyyy-MM-dd HH:mm:ss") : ""
    }))
  }

  const handleTabsChange = (value: string) => {
    setTabs(value)
    if (value === "daily" || value === "weekly" || value === "monthly" || value === "yearly") {
      setDate(dateRangesByPeriod[value])
    }
    return;
  }

  const data = [
    {
      name: "Sardor",
      service: "Ukol",
      price: 20000
    },
    {
      name: "Zuxriddin",
      service: "Yotib davolanish",
      price: 245000
    }
  ]

  return (
    <div className="p-4">
      <Tabs defaultValue={tabs} value={tabs} onValueChange={(value) => handleTabsChange(value)}>
        <div className="w-full flex justify-between">
          <TabsList className="">
            {dashboardTabs.map((tab) => (
              <TabsTrigger className="min-w-20 text-center" key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs === "custom" && (
            <DatePickerWithRange defaultValue={date} onChange={handleDateChange} />
          )}
        </div>
        {dashboardTabs.map((tab) => (
          <TabsContent
            key={tab.value}
            value={tab.value}
            className="w-full h-full"
          >
            <Tabs className="mt-4" value={dashboardType} onValueChange={setDashboardType}>
              <div className="w-full flex justify-between items-center">
                <TabsList>
                  <TabsTrigger value="table">
                    Jadval
                  </TabsTrigger>
                  <TabsTrigger value="pie-chart">
                    Diagramma
                  </TabsTrigger>
                </TabsList>
                {dashboardType === "table" && (
                  <Button variant={"secondary"} className="space-x-2">
                    <Download className="h-4 w-4" />
                    <span>Excel ga yuklash</span>
                  </Button>
                )}
              </div>
              <TabsContent className="mt-2" value="table">
                <Card>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>
                            Bemor ismi
                          </TableHead>
                          <TableHead>
                            Muolaja turi
                          </TableHead>
                          <TableHead>
                            To'lov summasi
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {data.map((d, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              {d.name}
                            </TableCell>
                            <TableCell>
                              {d.service}
                            </TableCell>
                            <TableCell>
                              {formatNumberComma(d.price)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="pie-chart">
                <Component />
              </TabsContent>
            </Tabs>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

export default Dashboards