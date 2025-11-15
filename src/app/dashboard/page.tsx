"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Volume2,
  Music,
  Settings,
  ChevronLeft,
  ChevronRight,
  Bell,
  Code,
  Upload,
  Percent,
  Home,
  LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { AttendanceProgress } from "@/components/widgets/AttendanceProgress";

// ✅ define sidebar item types
type SidebarHeading = {
  label: string;
  type: "heading";
  className: string;
};

type SidebarLink = {
  label: string;
  icon: LucideIcon;
  href: string;
  active?: boolean;
  type?: undefined;
};

type SidebarItem = SidebarHeading | SidebarLink;

export default function DashboardPage() {
  const [collapsed, setCollapsed] = useState(false);

  const sidebarItems = [
    { label: "Home", icon: Home, href: "#", active: true },
    { label: "Voices", icon: Volume2, href: "#" },

    { label: "Voice Changer", icon: LayoutDashboard, href: "#" },
    { label: "Attendence Manager", icon: Percent, href: "#" },
    { label: "Sound Effects", icon: Music, href: "#" },
    { label: "Voice Isolator", icon: Settings, href: "#" },
  ];

  return (
    <div className="flex h-screen w-full bg-background text-white">
      {/* Sidebar */}
      <aside
        className={`${
          collapsed ? "w-[72px]" : "w-64"
        } h-full min-h-0 flex-shrink-0 border-r border-white/10 bg-[#0f0f0f] flex flex-col overflow-hidden transition-[width] duration-300`}
      >
        {/* Logo + Collapse */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
          {!collapsed && (
            <span className="text-lg font-bold tracking-tight">SynapEase</span>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-neutral-400 hover:text-white transition"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto no-scrollbar px-2 py-3 flex flex-col gap-1 justify-start">
          {/* Creative Platform */}
          <div
            className={`text-xs font-semibold text-neutral-400 px-3 mt-3 mb-2 transition-all duration-300 ${
              collapsed
                ? "opacity-0 -translate-x-2"
                : "opacity-100 translate-x-0"
            }`}
          >
            Tools
          </div>

          {sidebarItems.slice(0, 2).map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className={`flex items-center h-12 gap-3 px-3 rounded-md text-sm transition-all duration-200 ${
                item.active
                  ? "bg-white/10 text-white"
                  : "text-neutral-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon size={18} />
              {!collapsed && (
                <span
                  className={`whitespace-nowrap overflow-hidden ${
                    collapsed ? "w-0 opacity-0" : "w-auto opacity-100 ml-1"
                  }`}
                  style={{ display: "inline-block" }}
                >
                  {item.label}
                </span>
              )}
            </Link>
          ))}

          {/* Playground */}
          <div
            className={`text-xs font-semibold text-neutral-400 px-3 mt-6 mb-2 transition-all duration-300 ${
              collapsed
                ? "opacity-0 -translate-x-2"
                : "opacity-100 translate-x-0"
            }`}
          >
            Playground
          </div>

          {sidebarItems.slice(2, 6).map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className={`flex items-center h-12 gap-3 px-3 rounded-md text-sm transition-all duration-200 ${
                item.active
                  ? "bg-white/10 text-white"
                  : "text-neutral-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon size={18} />
              {!collapsed && (
                <span
                  className={`whitespace-nowrap overflow-hidden ${
                    collapsed ? "w-0 opacity-0" : "w-auto opacity-100 ml-1"
                  }`}
                  style={{ display: "inline-block" }}
                >
                  {item.label}
                </span>
              )}
            </Link>
          ))}

          {/* Products */}
          <div
            className={`text-xs font-semibold text-neutral-400 px-3 mt-6 mb-2 transition-all duration-300 ${
              collapsed
                ? "opacity-0 -translate-x-2"
                : "opacity-100 translate-x-0"
            }`}
          >
            Products
          </div>

          {sidebarItems.slice(6).map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className={`flex items-center h-12 gap-3 px-3 rounded-md text-sm transition-all duration-200 ${
                item.active
                  ? "bg-white/10 text-white"
                  : "text-neutral-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon size={18} />
              {!collapsed && (
                <span
                  className={`whitespace-nowrap overflow-hidden ${
                    collapsed ? "w-0 opacity-0" : "w-auto opacity-100 ml-1"
                  }`}
                  style={{ display: "inline-block" }}
                >
                  {item.label}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Upgrade Button */}
        <div className="p-3 border-t border-white/10">
          <button className="w-full rounded-lg border border-white/10 bg-neutral-900 py-2 text-sm font-medium hover:bg-neutral-800 transition">
            Upgrade
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto no-scrollbar">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <div className="flex items-center gap-3">
            <button className="rounded-lg bg-white/10 p-2 hover:bg-white/20 transition">
              <Bell size={18} />
            </button>
            <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5">
              <span className="grid h-7 w-7 place-items-center rounded-md bg-violet-600 text-xs font-semibold">
                A
              </span>
              <span className="text-sm">Agrim</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-white/10 bg-neutral-900/60 p-6 flex flex-col items-center justify-center hover:bg-neutral-900 transition"
            >
              {i === 0 ? (
                <>
                  <h2 className="text-lg font-medium mb-4">Attendance</h2>
                  <AttendanceProgress percentage={80} />
                </>
              ) : (
                <>
                  <h2 className="text-lg font-medium mb-2">Widget {i + 1}</h2>
                  <p className="text-sm text-neutral-400">
                    This is a placeholder for your future tool or analytics
                    module.
                  </p>
                </>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
