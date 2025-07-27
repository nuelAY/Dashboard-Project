// components/Sidebar.tsx
'use client';

import { usePathname } from 'next/navigation';
import { Home, BarChart, Settings, X } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const links = [
  { href: '/', icon: Home, label: 'Dashboard' },
  { href: '/analytics', icon: BarChart, label: 'Analytics' },
  { href: '/settings', icon: Settings, label: 'Settings' },
];

export function Sidebar({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop */}
      <aside className="hidden md:flex w-64 bg-white dark:bg-gray-900 border-r">
        <div className="p-4 text-xl font-bold">MyDashboard</div>
        <nav className="flex flex-col gap-1 p-2 w-full">
          {links.map(({ href, icon: Icon, label }) => {
            const isActive = pathname === href;
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

      {/* Mobile */}
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
                const isActive = pathname === href;
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
