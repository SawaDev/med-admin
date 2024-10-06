import React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateRangeType {
  defaultValue?: {
    from_date: string;
    to_date: string;
  };
  onChange?: (range: DateRange | undefined) => void;
}

const DatePickerWithRange: React.FC<DateRangeType> = ({
  onChange,
  defaultValue,
}) => {
  const [date, setDate] = React.useState<DateRange | undefined>(
    defaultValue
      ? {
          from: new Date(defaultValue.from_date),
          to: new Date(defaultValue.to_date),
        }
      : undefined
  );

  return (
    <div className={"grid gap-2"}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(
                    date.from && date.from.toString().length > 0
                      ? date.from
                      : new Date(),
                    "dd-MM-yyyy"
                  )}{" "}
                  -{" "}
                  {date.to ? (
                    format(date.to, "dd-MM-yyyy")
                  ) : (
                    <span>---</span>
                  )}
                </>
              ) : (
                format(date.from, "dd-MM-yyyy")
              )
            ) : (
              <span>Kunni tanlang</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(range) => {
              console.log("rangeee", range?.from, range?.to);
              if (range?.from && range.to) {
                setDate(range);
                if (onChange) {
                  onChange(range);
                }
              } else {
                setDate(
                  defaultValue
                    ? {
                        from: new Date(defaultValue.from_date),
                        to: new Date(defaultValue.to_date),
                      }
                    : undefined
                );
                if (onChange) {
                  onChange(range);
                }
              }
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePickerWithRange;
