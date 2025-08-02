'use client';

import { usePathname } from 'next/navigation';
import { Home, BarChart, UserPen, Settings, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const links = [
  { href: '/', icon: Home, label: 'Dashboard' },
  { href: '/dashboard/users', icon: BarChart, label: 'Users' },
  { href: '/dashboard/profile', icon: UserPen, label: 'Profile' },
  { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
];

export function Sidebar({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 80 : 260 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="hidden md:flex flex-col h-screen border-r bg-white dark:bg-gray-900 relative"
      >
        <div className="flex justify-between items-center p-4">
          {!collapsed && <span className="text-lg font-bold">MyDashboard</span>}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
          >
            {collapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>

        <nav className="flex flex-col gap-1 px-2">
          <TooltipProvider>
            {links.map(({ href, icon: Icon, label }) => {
              const isActive = pathname === href || pathname.startsWith(`${href}/`);
              return (
                <Tooltip key={href}>
                  <TooltipTrigger asChild>
                    <Link
                      href={href}
                      className={cn(
                        'flex items-center gap-3 p-2 rounded-md transition font-medium text-sm',
                        isActive
                          ? 'bg-muted text-primary'
                          : 'text-gray-700 dark:text-gray-200 hover:bg-muted',
                        collapsed ? 'justify-center' : ''
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {!collapsed && <span>{label}</span>}
                    </Link>
                  </TooltipTrigger>
                  {collapsed && <TooltipContent side="right">{label}</TooltipContent>}
                </Tooltip>
              );
            })}
          </TooltipProvider>
        </nav>
      </motion.aside>

      {/* Mobile Sidebar */}
      {open && (
        <div className="fixed inset-0 z-40 md:hidden bg-black/40" onClick={() => setOpen(false)}>
          <aside
            className="fixed left-0 top-0 w-64 h-full bg-white dark:bg-gray-900 shadow z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b">
              <span className="text-lg font-bold">MyDashboard</span>
              <X onClick={() => setOpen(false)} className="cursor-pointer" />
            </div>
            <nav className="flex flex-col gap-1 p-2">
              {links.map(({ href, icon: Icon, label }) => {
                const isActive = pathname === href || pathname.startsWith(`${href}/`);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      'flex items-center gap-3 p-2 rounded-md transition font-medium text-sm',
                      isActive
                        ? 'bg-muted text-primary'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-muted'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </Link>
                );
              })}
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}
