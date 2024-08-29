import React from "react"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { Input } from "./input"
import { Button } from "./button"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "./calendar"
import { format } from "date-fns"

export function DatePickerDemo() {
  const [stringDate, setStringDate] = React.useState<string>("")
  const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <div className="relative w-full">
        <Input
          type="date"
          value={stringDate}
          onChange={(e) => {
            setStringDate(e.target.value)
            const parsedDate = new Date(e.target.value)
            if (isNaN(parsedDate.getTime())) {
              setDate(undefined)
            } else {
              setDate(parsedDate)
            }
          }}
        />
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "font-normal absolute right-0 translate-y-[-50%] top-[50%] rounded-l-none",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="w-4 h-4" />
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(selectedDate) => {
            if (!selectedDate) return
            setDate(selectedDate)
            setStringDate(format(selectedDate, "yyyy-MM-dd"))
          }}
          defaultMonth={date}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
