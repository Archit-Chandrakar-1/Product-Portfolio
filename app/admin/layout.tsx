"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  Award, 
  Settings, 
  LogOut, 
  Menu, 
  X 
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Projects', href: '/admin/projects', icon: Briefcase },
    { name: 'Experience', href: '/admin/experience', icon: Award }, // Icons can be swapped
    { name: 'Blogs', href: '/admin/blog', icon: FileText },
    { name: 'Certifications', href: '/admin/certifications', icon: Award },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#050508] flex text-white font-sans selection:bg-red-500/30">
      
      {/* --- SIDEBAR --- */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0A0A0A] border-r border-neutral-800 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:relative lg:translate-x-0`}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-center border-b border-neutral-800">
          <h1 className="text-xl font-bold tracking-tight">
            AC <span className="text-red-500">ADMIN</span>
          </h1>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? 'bg-red-600 text-white shadow-lg shadow-red-900/20' 
                    : 'text-neutral-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon size={20} className={isActive ? 'text-white' : 'group-hover:text-red-500 transition-colors'} />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer / Logout */}
        <div className="absolute bottom-0 w-full p-4 border-t border-neutral-800">
          <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-neutral-400 hover:bg-red-900/10 hover:text-red-500 transition-all">
            <LogOut size={20} />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Navbar (Mobile Toggle) */}
        <header className="h-16 bg-[#050508]/80 backdrop-blur-md border-b border-neutral-800 flex items-center justify-between px-6 lg:hidden sticky top-0 z-40">
          <span className="font-bold">Admin Panel</span>
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 text-neutral-400">
            {isSidebarOpen ? <X /> : <Menu />}
          </button>
        </header>

        {/* Content Render */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          {children}
        </main>
      </div>

    </div>
  );
}