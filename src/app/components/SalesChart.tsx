
'use client';

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useEffect, useState } from "react";

const defaultData = [
  { name: "Jan", sales: 400 },
  { name: "Feb", sales: 800 },
  { name: "Mar", sales: 650 },
  { name: "Apr", sales: 900 },
  { name: "May", sales: 750 },
  { name: "Jun", sales: 1200 },
  { name: "Jul", sales: 1050 },
];

export function SalesChart({ title = "Monthly Sales", data = defaultData }: { title?: string; data?: typeof defaultData }) {
  const { ref, inView } = useInView({ triggerOnce: true });
  const [animatedData, setAnimatedData] = useState(defaultData.map(d => ({ ...d, sales: 0 })));

  useEffect(() => {
    if (inView) {
      const interval = setInterval(() => {
        setAnimatedData(prev => {
          const newData = [...prev];
          let updated = false;
          for (let i = 0; i < newData.length; i++) {
            if (newData[i].sales < data[i].sales) {
              newData[i].sales += Math.ceil(data[i].sales / 20);
              if (newData[i].sales > data[i].sales) newData[i].sales = data[i].sales;
              updated = true;
            }
          }
          if (!updated) clearInterval(interval);
          return newData;
        });
      }, 50);
    }
  }, [inView, data]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="transition-shadow hover:shadow-lg bg-white dark:bg-gray-950 rounded-xl p-4 shadow-md"
    >
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={animatedData}>
          <XAxis dataKey="name" stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip />
          <Bar dataKey="sales" fill="#6366f1">
            {animatedData.map((entry, index) => (
              <Cell key={`cell-${index}`} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
