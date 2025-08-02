'use client';

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useEffect, useState } from 'react';

const baseData = [
  { month: 'Jan', users: 400 },
  { month: 'Feb', users: 600 },
  { month: 'Mar', users: 800 },
  { month: 'Apr', users: 1000 },
  { month: 'May', users: 1200 },
  { month: 'Jun', users: 1500 },
];

export default function AnalyticsChart() {
  const { ref, inView } = useInView({ triggerOnce: true });
  const [animatedData, setAnimatedData] = useState(baseData.map(d => ({ ...d, users: 0 })));

  useEffect(() => {
    if (inView) {
      const interval = setInterval(() => {
        setAnimatedData(prev => {
          const newData = [...prev];
          let updated = false;
          for (let i = 0; i < newData.length; i++) {
            if (newData[i].users < baseData[i].users) {
              newData[i].users += Math.ceil(baseData[i].users / 20);
              if (newData[i].users > baseData[i].users) newData[i].users = baseData[i].users;
              updated = true;
            }
          }
          if (!updated) clearInterval(interval);
          return newData;
        });
      }, 50);
    }
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-md w-full"
    >
      <h3 className="text-lg font-semibold mb-4">User Growth Over Months</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={animatedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="users" stroke="#4f46e5" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}