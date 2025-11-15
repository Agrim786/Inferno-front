"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Settings,
  Home,
  Mail,
  FileText,
  Upload,
  ToolCase,
  ArrowUp,
  User,
  PanelRight,
} from "lucide-react";
import Image from "next/image";

export default function AccountCenter() {
  const [uploads, setUploads] = useState<UploadItem[]>([]);
  const [message, setMessage] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  type UploadItem = {
    id: string;
    file: File;
    status: "uploading" | "done";
  };
  function getTypeLabel(file: File) {
    const ext = file.name.split(".").pop()?.toLowerCase();
    if (["png", "jpg", "jpeg"].includes(ext!)) return "IMG";
    if (ext === "pdf") return "PDF";
    return "FILE";
  }

  function markDone(id: string) {
    setTimeout(() => {
      setUploads((prev) =>
        prev.map((u) => (u.id === id ? { ...u, status: "done" } : u))
      );
    }, 800);
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex min-h-[100dvh] md:h-screen bg-background text-gray-100 font-inter">
      {/* ---- LEFT SIDEBAR ---- */}
      {/* ---- LEFT SIDEBAR ---- */}
      <aside
        className={`
    ${isSidebarOpen ? "md:w-64" : "md:w-16"} 
    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
    md:translate-x-0
    fixed md:relative w-64 top-0 left-0 h-full
    bg-[#0f0f0f] border-r border-white/10 flex flex-col justify-between p-4
    transition-all duration-500 ease-in-out z-40
  `}
      >
        {/* --- TOP SECTION --- */}
        <div>
          <div className="relative w-full h-10 mb-8 flex items-center justify-between">
            {/* Logo (always visible) */}
            <div
              onClick={() => {
                if (!isSidebarOpen) setIsSidebarOpen(true);
              }}
              className="flex items-center justify-center cursor-pointer flex-shrink-0"
            >
              <div className="relative w-8 h-8">
                <Image
                  src="/SynapEase.svg"
                  alt="SynapEase Logo"
                  fill
                  className="object-contain select-none pointer-events-none"
                  priority
                />
              </div>
            </div>

            {/* Toggle button (hidden on desktop) */}
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden flex items-center justify-center h-7 w-7 rounded hover:bg-white/20 transition"
              aria-label="Close sidebar"
            >
              <PanelRight className="h-4 w-4 text-white" />
            </button>

            {/* Desktop close button */}
            {isSidebarOpen && (
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="hidden md:flex items-center justify-center h-7 w-7 rounded hover:bg-white/20 transition"
                aria-label="Toggle sidebar"
              >
                <PanelRight className="h-4 w-4 text-white" />
              </button>
            )}
          </div>

          {/* --- MENU (hidden when closed) --- */}
          <div
            className={`transition-all duration-500 ease-in-out ${
              isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="space-y-2">
              <SidebarItem icon={<Home size={18} />} label="Home" active />
              <SidebarItem
                icon={<Settings size={18} />}
                label="Settings"
                shortcut="S"
              />
            </div>

            <p className="text-xs text-gray-500 mt-8 mb-3 uppercase tracking-widest">
              History
            </p>
            <div className="space-y-2">
              <SidebarItem label="Chat1" />
              <SidebarItem label="Chat2" />
              <SidebarItem label="Chat3" />
            </div>
          </div>
        </div>

        {/* --- FOOTER --- */}
        {isSidebarOpen && (
          <div className="flex items-center gap-3 mt-10 p-2 bg-white/5 rounded-xl transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]">
            <User width={32} height={32} className="rounded-full" />
            <div>
              <p className="text-sm font-medium">Agrim</p>
              <p className="text-xs text-gray-400">SynapEase Plus</p>
            </div>
          </div>
        )}
      </aside>

      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="md:hidden fixed top-4 left-4 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10"
          aria-label="Open sidebar"
        >
          <PanelRight className="h-5 w-5 text-white" />
        </button>
      )}

      <input
        id="upload"
        type="file"
        accept=".png,.jpg,.jpeg,.pdf"
        multiple
        onChange={(e) => {
          if (!e.target.files) return;
          const files = Array.from(e.target.files);

          const items: UploadItem[] = files.map((f) => ({
            id:
              globalThis.crypto?.randomUUID?.() ??
              `${Date.now()}-${Math.random()}`,
            file: f,
            status: "uploading",
          }));

          setUploads((prev) => [...prev, ...items]);
          setMenuOpen(false);

          // Simulate upload completion
          items.forEach((it) => markDone(it.id));
        }}
        className="hidden"
      />
      <main className="flex-1 flex flex-col justify-between items-center px-4 sm:px-6 pb-[env(safe-area-inset-bottom)] md:pb-6 relative transition-all duration-300 ease-in-out min-h-[100dvh] md:h-screen">
        {/* ---- MAIN WRAPPER ---- */}
        <div className="flex flex-col w-full max-w-4xl mx-auto text-center min-h-[calc(100vh-120px)] md:h-full justify-between md:justify-center items-center">
          {/* ---- HEADER / GREETING ---- */}
          <div className="flex flex-col items-center justify-center flex-grow text-center">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              Welcome, what’s happening today?
            </h1>
          </div>

          {/* ---- CHAT / INPUT SECTION ---- */}
          <div className="w-full flex justify-center mb-1 md:mb-4">
            <div className="w-[98%] sm:w-[90%] md:max-w-4xl rounded-xl border border-white/10 bg-[rgba(16,16,16,0.5)] shadow-2xl backdrop-blur-lg px-2 py-5 sm:px-4 md:px-6 transition-all duration-500 ease-in-out origin-bottom translate-y-[3px] md:translate-y-0">
              {/* Uploaded Files */}
              {uploads.length > 0 && (
                <div className="mb-6 sm:mb-7 mt-0 sm:mt-1 flex flex-wrap gap-3 justify-start px-2 sm:px-1 transition-all duration-500 ease-in-out">
                  {uploads.map((u) => (
                    <div
                      key={u.id}
                      className="
          relative flex items-center gap-2 sm:gap-3
          rounded-lg sm:rounded-xl
          border border-white/15 bg-white/10 backdrop-blur-lg
          px-2 py-1.5 sm:px-3 sm:py-2
          shadow-sm max-w-[260px] sm:max-w-[320px]
          text-xs sm:text-sm"
                    >
                      <div className="h-7 w-7 sm:h-8 sm:w-8 flex items-center justify-center rounded-md bg-white/10 text-[10px] font-semibold text-white/85">
                        {u.status === "uploading" ? (
                          <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        ) : (
                          <span>{getTypeLabel(u.file)}</span>
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm text-white/90">
                          {u.file.name}
                        </p>
                        {u.status === "uploading" && (
                          <p className="text-[11px] text-white/55 -mt-0.5"></p>
                        )}
                      </div>

                      <button
                        onClick={() =>
                          setUploads((prev) =>
                            prev.filter((x) => x.id !== u.id)
                          )
                        }
                        className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white/20 hover:bg-white/40 transition"
                        aria-label="Remove file"
                        title="Remove file"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Input Row */}
              <div className="flex flex-row flex-wrap items-start gap-3 sm:gap-4 md:flex-nowrap md:items-center md:gap-6">
                <div className="flex flex-1 min-w-0 flex-col gap-2">
                  <div className="flex items-center gap-3 sm:gap-4 w-full">
                    {/* Plus button with dropdown */}
                    <div ref={menuRef} className="relative">
                      <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition leading-none"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4 text-white"
                        >
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      </button>

                      {menuOpen && (
                        <div className="absolute bottom-12 left-0 bg-[#1b1b1b] border border-white/10 rounded-lg shadow-lg w-44 py-2 z-50">
                          <label
                            htmlFor="upload"
                            className="flex items-center gap-2 px-3 py-2 text-sm text-white/80 hover:bg-white/5 cursor-pointer"
                          >
                            <Upload className="h-4 w-4 text-white/70" />
                            Add photos & files
                          </label>
                          <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-white/80 hover:bg-white/5 text-left">
                            <ToolCase className="h-4 w-4 text-white/70" />
                            Tools
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Message input */}
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Ask anything..."
                      inputMode="text"
                      className="flex-1 bg-transparent border-none outline-none text-[16px] sm:text-base text-white/80 placeholder:text-white/40"
                      style={{ fontSize: "16px" }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-auto shrink-0 relative">
                  <button className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-105">
                    <ArrowUp className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}

function SidebarItem({
  icon,
  label,
  shortcut,
  active = false,
}: {
  icon?: React.ReactNode;
  label: string;
  shortcut?: string;
  active?: boolean;
}) {
  return (
    <button
      className={`flex items-center justify-between w-full px-3 py-2 rounded-md text-sm ${
        active
          ? "bg-white/10 text-white"
          : "text-gray-400 hover:text-white hover:bg-white/5 transition"
      }`}
    >
      <span className="flex items-center gap-3">
        {icon}
        {label}
      </span>
      {shortcut && <span className="text-xs text-gray-500">{shortcut}</span>}
    </button>
  );
}

function UsageBox({
  title,
  used,
  total,
  color,
}: {
  title: string;
  used: string;
  total: string;
  color: string;
}) {
  return (
    <div
      className={`bg-white/5 border ${color} rounded-xl p-4 flex flex-col justify-between`}
    >
      <p className="text-sm text-gray-400">{title}</p>
      <p className="text-lg font-semibold mt-2">
        {used} <span className="text-gray-500 text-sm">/ {total}</span>
      </p>
    </div>
  );
}
