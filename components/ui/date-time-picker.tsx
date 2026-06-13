"use client";

import * as React from "react";
import { de } from "react-day-picker/locale";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Props = {
  /**
   * "date": Wert hat das Format "YYYY-MM-DD".
   * "datetime": Wert hat das Format "YYYY-MM-DDTHH:mm".
   */
  mode: "date" | "datetime";
  /** Aktueller Wert (leerer String = nichts gewählt). */
  value: string;
  onChange: (value: string) => void;
  id?: string;
  className?: string;
  /** Trigger-Text, solange kein Datum gewählt ist. */
  placeholder?: string;
};

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function dateToYmd(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** Datums-Teil ("YYYY-MM-DD") des Werts -> lokales Date (oder undefined). */
function parseDate(value: string): Date | undefined {
  const datePart = value.split("T")[0];
  if (!datePart) return undefined;
  const [y, m, d] = datePart.split("-").map(Number);
  if (!y || !m || !d) return undefined;
  const date = new Date(y, m - 1, d);
  return isNaN(date.getTime()) ? undefined : date;
}

/** Zeit-Teil ("HH:mm") des Werts (nur im datetime-Modus relevant). */
function parseTime(value: string): string {
  return value.split("T")[1] ?? "";
}

const DATE_LABEL: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "long",
  year: "numeric",
};

export function DateTimePicker({
  mode,
  value,
  onChange,
  id,
  className,
  placeholder = "Datum wählen",
}: Props) {
  const [open, setOpen] = React.useState(false);

  const selectedDate = parseDate(value);
  const time = parseTime(value);

  function handleDateSelect(date: Date | undefined) {
    if (!date) {
      onChange("");
      return;
    }
    const ymd = dateToYmd(date);
    if (mode === "date") {
      onChange(ymd);
      setOpen(false);
      return;
    }
    // datetime: vorhandene Zeit behalten, sonst 00:00 vorbelegen.
    onChange(`${ymd}T${time || "00:00"}`);
  }

  function handleTimeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const nextTime = e.target.value;
    // Ohne gewähltes Datum heute als Basis nehmen, damit die Zeit greift.
    const base = selectedDate ?? new Date();
    const ymd = dateToYmd(base);
    onChange(nextTime ? `${ymd}T${nextTime}` : ymd);
  }

  const triggerLabel = selectedDate
    ? mode === "datetime"
      ? `${selectedDate.toLocaleDateString("de-DE", DATE_LABEL)}${
          time ? `, ${time}` : ""
        }`
      : selectedDate.toLocaleDateString("de-DE", DATE_LABEL)
    : placeholder;

  return (
    <div className={cn("flex gap-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            type="button"
            variant="outline"
            className={cn(
              "flex-1 justify-start text-left font-normal",
              !selectedDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="size-4 shrink-0" />
            <span className="truncate">{triggerLabel}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            locale={de}
            selected={selectedDate}
            onSelect={handleDateSelect}
            defaultMonth={selectedDate}
            captionLayout="dropdown"
            autoFocus
          />
        </PopoverContent>
      </Popover>

      {mode === "datetime" && (
        <Input
          type="time"
          aria-label="Uhrzeit"
          value={time}
          onChange={handleTimeChange}
          className="w-[8.5rem] shrink-0"
        />
      )}
    </div>
  );
}
