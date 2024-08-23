import React, { ForwardedRef, KeyboardEvent, useCallback, useMemo, useRef, useState } from "react";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { Option } from "@/types/Other.type";

interface MultiSelectProps {
  options: Option[]
  onChange: (value: string[]) => void
  defaultValue: string[]
  ref?: ForwardedRef<HTMLInputElement>
}

const MultiSelect: React.FC<MultiSelectProps> = ({ options, onChange, defaultValue, ref }) => {
  const selectedValues = useMemo(() => {
    return options.filter(option => defaultValue.includes(option.value))
  }, [options])

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Option[]>(selectedValues);
  const [inputValue, setInputValue] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const handleUnselect = (data: Option) => {
    const newValues = selected.filter(s => s.value !== data.value);
    setSelected(newValues);
    onChange(newValues.map(s => s.value));
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            setSelected((prev) => {
              const newSelected = [...prev];
              newSelected.pop();

              onChange(newSelected.map(s => s.value))
              return newSelected;
            });
          }
        }

        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    []
  );

  const selectables = options?.filter((data) => !selected.includes(data));

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div className="group rounded-md border border-input px-3 py-2 text-sm leading-[22.5px] ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex flex-wrap gap-1">
          {selected?.map((data) => {
            return (
              <Badge key={data.value} variant="secondary">
                {data.label}
                <button
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(data);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(data)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            );
          })}
          <CommandPrimitive.Input
            ref={inputRef ?? ref}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder="Qidirish..."
            className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <div className="relative mt-2">
        <CommandList>
          {open && selectables?.length > 0 ? (
            <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
              <CommandGroup className="h-full overflow-auto">
                {selectables.map((data) => {
                  return (
                    <CommandItem
                      key={data.value}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onSelect={() => {
                        setInputValue("");
                        setSelected((prev) => {
                          const newValues = prev.map(v => v.value);
                          onChange([...newValues, data.value])
                          return [...prev, data]
                        });
                      }}
                      className={"cursor-pointer"}
                    >
                      {data.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </div>
          ) : null}
        </CommandList>
      </div>
    </Command>
  );
}

export default MultiSelect