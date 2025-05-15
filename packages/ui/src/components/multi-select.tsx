"use client";

import * as React from "react";
import { Check } from "lucide-react";

import { cn } from "@workspace/ui/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@workspace/ui/components/command";
import { Popover, PopoverContent, PopoverTrigger } from "@workspace/ui/components/popover";

type Item = {
  value: string;
  label: string | React.ReactNode;
};

type MultipleSelectorProps = {
  list: Item[];
  defaultValues: string[];
  truncateValues?: boolean;
  placeholder?: string;
};

export function MultipleSelector({
  list,
  defaultValues,
  truncateValues,
  placeholder,
}: MultipleSelectorProps) {
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState<string[]>(defaultValues || []);

  const handleSetValue = (val: string) => {
    if (values.includes(val)) {
      values.splice(values.indexOf(val), 1);
      const newValues = values.filter((value) => value !== val);
      setValues(newValues);
    } else {
      setValues((prevValues) => [...prevValues, val]);
    }
  };

  function renderSelected() {
    const _values = truncateValues ? values.slice(0, 1) : values;
    const rest = values.slice(1, values.length);

    if (_values.length === 0) return placeholder ?? "Choose item";

    return (
      <div className="flex items-center gap-1">
        {_values.map((val, i) => (
          <div
            key={i}
            className="rounded-full border bg-background text-xs font-medium hover:cursor-pointer p-0.5 pr-1"
          >
            {list.find((item) => item.value === val)?.label}
          </div>
        ))}
        {truncateValues && values.length > 1 ? (
          <OtherItemsTooltip
            list={
              rest.map((val) =>
                list.find((item) => item.value === val)
              ) as Item[]
            }
            label={`+ ${values.length - 1}`}
          />
        ) : (
          ""
        )}
      </div>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          role="combobox"
          aria-expanded={open}
          className="justify-between p-0"
        >
          <div className="flex gap-2 justify-start">{renderSelected()}</div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="p-0 bg-background">
        <Command>
          <CommandInput placeholder="Search" />
          <CommandEmpty>No item found.</CommandEmpty>
          <CommandGroup>
            <CommandList>
              {list.map((item) => {
                return (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    onSelect={() => {
                      handleSetValue(item.value);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        values.includes(item.value)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {item.label}
                  </CommandItem>
                );
              })}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

type OtherItemsTooltipProps = {
  list: Item[];
  label: string;
};

function OtherItemsTooltip({ list, label }: OtherItemsTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{label}</TooltipTrigger>
        <TooltipContent>
          <div className="flex items-center justify-center gap-2">
            {list.map((item) => item.label)}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
