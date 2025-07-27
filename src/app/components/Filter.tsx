// components/Filters.tsx
'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

export function Filters({ onChange }: { onChange: (filters: { month: string; year: string }) => void }) {
  const [month, setMonth] = useState("July");
  const [year, setYear] = useState("2025");

  function handleChange(newMonth: string, newYear: string) {
    onChange({ month: newMonth, year: newYear });
  }

  return (
    <div className="flex gap-4 mb-6">
      <Select defaultValue={month} onValueChange={(val) => { setMonth(val); handleChange(val, year); }}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Select month" />
        </SelectTrigger>
        <SelectContent>
          {["January", "February", "March", "April", "May", "June", "July", "August"].map((m) => (
            <SelectItem key={m} value={m}>{m}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select defaultValue={year} onValueChange={(val) => { setYear(val); handleChange(month, val); }}>
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Select year" />
        </SelectTrigger>
        <SelectContent>
          {["2023", "2024", "2025"].map((y) => (
            <SelectItem key={y} value={y}>{y}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
