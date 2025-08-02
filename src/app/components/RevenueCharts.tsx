'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';

const chartData = [
  { month: 'Jan', revenue: 2400, orders: 240 },
  { month: 'Feb', revenue: 3600, orders: 300 },
  { month: 'Mar', revenue: 4800, orders: 380 },
  { month: 'Apr', revenue: 5200, orders: 410 },
  { month: 'May', revenue: 6100, orders: 460 },
  { month: 'Jun', revenue: 7200, orders: 520 },
];

export default function RevenueChart() {
  const [year, setYear] = useState('2025');
  const [month, setMonth] = useState('All');
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-md w-full"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Revenue & Orders</h3>

        <div className="flex gap-4">
          {/* Month Filter */}
          <Select onValueChange={setMonth} defaultValue={month}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Jan">Jan</SelectItem>
              <SelectItem value="Feb">Feb</SelectItem>
              <SelectItem value="Mar">Mar</SelectItem>
              <SelectItem value="Apr">Apr</SelectItem>
              <SelectItem value="May">May</SelectItem>
              <SelectItem value="Jun">Jun</SelectItem>
            </SelectContent>
          </Select>

          {/* Year Filter */}
          <Select onValueChange={setYear} defaultValue={year}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={month === 'All' ? chartData : chartData.filter(d => d.month === month)}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="revenue" fill="#4f46e5" />
          <Bar dataKey="orders" fill="#10b981" />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
