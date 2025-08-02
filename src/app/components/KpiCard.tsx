'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect, useState } from "react";

type KPIProps = {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
};

export const KPI = ({ title, value, icon }: KPIProps) => {
  const [displayValue, setDisplayValue] = useState("0");
  const motionValue = useMotionValue(0);

  // Extract numeric part and identify prefix/suffix
  const { numValue, prefix, suffix } = parseValue(value);

  useEffect(() => {
    const controls = animate(motionValue, numValue, {
      duration: 2,
      onUpdate: (latest) => {
        setDisplayValue(`${prefix}${Math.round(latest).toLocaleString()}${suffix}`);
      },
    });

    return controls.stop;
  }, [motionValue, numValue, prefix, suffix]);

  return (
    <Card className="w-full md:w-1/2 lg:w-1/4 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
        <div className="text-2xl text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <motion.div className="text-2xl font-bold">
          {displayValue}
        </motion.div>
      </CardContent>
    </Card>
  );
};

// Helper to extract numeric value, prefix, suffix
function parseValue(value: string | number) {
  const valStr = String(value);
  const prefixMatch = valStr.match(/^[^\d.]*/)?.[0] || "";
  const suffixMatch = valStr.match(/[^\d.]*$/)?.[0] || "";
  const num = parseFloat(valStr.replace(/[^\d.]/g, "")) || 0;
  return { numValue: num, prefix: prefixMatch, suffix: suffixMatch };
}
