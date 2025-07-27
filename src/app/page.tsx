'use client'

import { motion } from 'framer-motion';
import { FaUsers, FaDollarSign, FaShoppingCart, FaChartLine } from 'react-icons/fa';
import { KPI } from '@/app/components/KpiCard';
import dynamic from 'next/dynamic'
import { Filters } from './components/Filter';
import { SalesChart } from './components/SalesChart';

const DashboardTabs = dynamic(() => import('@/app/components/DashboardTabs'), {
  ssr: false,
});

export default function DashboardPage() {
  const handleFilters = (filters: { month: string; year: string }) => {
    console.log("Filter changed:", filters);
    // You can refetch data based on filters here
  };
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Overview</h2>

       <Filters onChange={handleFilters} />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-wrap gap-6">
        <KPI title="Total Users" value="1,240" icon={<FaUsers />} />
        <KPI title="Revenue" value="$12,450" icon={<FaDollarSign />} />
        <KPI title="Orders" value="320" icon={<FaShoppingCart />} />
        <KPI title="Growth" value="18%" icon={<FaChartLine />} />
      </motion.div>
       <SalesChart />
      <DashboardTabs />
    </div>
  );
}
