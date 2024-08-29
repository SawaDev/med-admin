import * as React from "react";
import { Control, FieldValues, Path } from "react-hook-form";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Option } from "@/types/Other.type";
import { Check, ChevronsUpDown, PlusCircle } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";

interface FormSearchInputProps<T extends FieldValues> extends React.InputHTMLAttributes<HTMLInputElement> {
  control: Control<T, any>;
  name: Path<T>;
  label?: string;
  options?: Option[];
  defaultValue?: string;
  handleNew?: () => void;
}

const FormSearchInput = React.forwardRef<HTMLInputElement, FormSearchInputProps<any>>(
  ({ className, control, name, label, options = [], handleNew }, ref) => {
    return (
      <FormField
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => {
          return (
            <FormItem className={`${className} flex flex-col`}>
              {label && (
                <FormLabel>{label}</FormLabel>
              )}
              <Popover modal={true}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !value && ""
                      )}
                    >
                      {value
                        ? options.find(
                          (o) => o.value === value
                        )?.label
                        : "Tanlang..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[400px] p-0 relative">
                  <Command>
                    <CommandList>
                      <div className="h-[300px] flex flex-col justify-between overflow-y-auto">
                        <div>
                          <div className="bg-white z-50">
                            <CommandInput ref={ref} placeholder="Qidirish..." />
                          </div>
                          {options.length === 0 && (
                            <CommandEmpty>
                              <div className="flex flex-col items-center gap-2">
                                <span>Hech narsa yo'q.</span>
                                {handleNew && (
                                  <Button onClick={handleNew} variant={"outline"} className="sticky bottom-0 w-fit flex gap-1 justify-center items-center">
                                    <PlusCircle className="w-4 h-4" />
                                    Yangi Qo'shish
                                  </Button>
                                )}
                              </div>
                            </CommandEmpty>
                          )}
                          <CommandGroup>
                            {options.map((o) => (
                              <CommandItem
                                className="z-0"
                                value={o.label}
                                key={o.value}
                                onSelect={() => onChange(o.value)}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    o.value === value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {o.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </div>
                        {(options.length > 0 && handleNew) && (
                          <div className="sticky bottom-0 w-full">
                            <Button onClick={handleNew} className="w-full flex my-1 gap-1 justify-center items-center">
                              <PlusCircle className="w-4 h-4" />
                              Yangi Qo'shish
                            </Button>
                          </div>
                        )}
                      </div>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormControl />
              <FormMessage />
            </FormItem >
          )
        }}
      />
    );
  }
);

FormSearchInput.displayName = "FormSearchInput";

export { FormSearchInput };