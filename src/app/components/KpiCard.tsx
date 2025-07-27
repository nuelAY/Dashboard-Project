import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { FaUsers } from "react-icons/fa";

export const KPI = ({ title, value, icon }: { title: string; value: string | number; icon?: React.ReactNode }) => (
  <Card className="w-full md:w-1/2 lg:w-1/4 shadow-sm">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2">
      <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
      <div className="text-2xl text-muted-foreground">{icon}</div>
    </CardHeader>
    <CardContent className="p-4 pt-0">
      <div className="text-2xl font-bold">{value}</div>
    </CardContent>
  </Card>
);
