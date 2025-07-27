'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnalyticsChart from "./AnalyticsChart";
import RevenueChart from "./RevenueCharts";
import { DataTable } from "./Data-Table";

export default function DashboardTabs() {
  return (
    <Tabs defaultValue="users" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="users">User Growth</TabsTrigger>
        <TabsTrigger value="revenue">Revenue</TabsTrigger>
        <TabsTrigger value="table">User Table</TabsTrigger>
      </TabsList>

      <TabsContent value="users">
        <AnalyticsChart />
      </TabsContent>

      <TabsContent value="revenue">
        <RevenueChart />
      </TabsContent>

      <TabsContent value="table">
        <DataTable columns={[]} data={[]} />
      </TabsContent>
    </Tabs>
  );
}
