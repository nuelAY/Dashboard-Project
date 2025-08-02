
'use client';

import { Sidebar } from './sidebar';
import { Navbar } from './navbar';
import { useState } from 'react';

export function SidebarLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-muted">
      {/* Mobile sidebar */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex flex-col flex-1">
        <Navbar setSidebarOpen={setSidebarOpen} />
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
