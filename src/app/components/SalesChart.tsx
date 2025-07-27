// components/SalesChart.tsx
'use client';

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", sales: 400 },
  { name: "Feb", sales: 800 },
  { name: "Mar", sales: 650 },
  { name: "Apr", sales: 900 },
];

export function SalesChart() {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-gray-950 rounded-xl p-4 shadow-md"
    >
      <h3 className="text-lg font-semibold mb-2">Monthly Sales</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="sales" fill="#6366f1" />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
