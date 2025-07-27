// components/ChartTabs.tsx
'use client';

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SalesChart } from "./SalesChart";
import RevenueChart  from "./RevenueCharts";

export function ChartTabs() {
  return (
    <Tabs defaultValue="sales" className="space-y-4">
      <TabsList>
        <TabsTrigger value="sales">Sales</TabsTrigger>
        <TabsTrigger value="revenue">Revenue</TabsTrigger>
      </TabsList>

      <TabsContent value="sales">
        <SalesChart />
      </TabsContent>
      <TabsContent value="revenue">
        <RevenueChart />
      </TabsContent>
    </Tabs>
  );
}
