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

type SuggestedPlan = {
  steps?: string[];
  note?: string;
};

type Analysis = {
  intent: string;
  emotion: string;
  riskLevel: string;
  moduleType?: string;
  suggestedPlan?: SuggestedPlan;
  summary?: string;
};

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  analysis?: Analysis;
};

// function getMoodBackgroundClass(emotion?: string) {
//   switch (emotion) {
//     case "anxious":
//     case "stressed":
//       return "bg-gradient-to-b from-[#111827] via-[#020617] to-black";
//     case "sad":
//     case "low":
//       return "bg-gradient-to-b from-[#020617] via-black to-[#020617]";
//     case "angry":
//       return "bg-gradient-to-b from-[#450a0a] via-black to-black";
//     case "calm":
//     case "relieved":
//       return "bg-gradient-to-b from-[#022c22] via-black to-black";
//     default:
//       return "bg-background";
//   }
// }

export default function AccountCenter() {
  const [uploads, setUploads] = useState<UploadItem[]>([]);
  const [message, setMessage] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Auto-scroll to bottom when messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  function formatSyllabus(s: any): string {
    if (!s || typeof s !== "object") return "";

    const lines: string[] = [];

    // Title / Code if present
    if (typeof s.title === "string") lines.push(`Course: ${s.title}`);
    if (typeof s.code === "string") lines.push(`Code: ${s.code}`);
    if (typeof s.instructor === "string")
      lines.push(`Instructor: ${s.instructor}`);
    if (typeof s.term === "string") lines.push(`Term: ${s.term}`);

    // Units/Chapters/Modules — handle common shapes safely
    const buckets = [
      { key: "units", label: "Units" },
      { key: "chapters", label: "Chapters" },
      { key: "modules", label: "Modules" },
    ];
    for (const { key, label } of buckets) {
      const arr = Array.isArray(s[key]) ? s[key] : null;
      if (!arr || arr.length === 0) continue;

      lines.push("");
      lines.push(`${label}:`);
      arr.forEach((item: any, idx: number) => {
        const unit = item?.unit ?? item?.number ?? idx + 1;
        const title = typeof item?.title === "string" ? item.title : "";
        const header = title ? `  ${unit}. ${title}` : `  ${unit}.`;
        lines.push(header);

        const topics = Array.isArray(item?.topics) ? item.topics : null;
        if (topics && topics.length) {
          lines.push(`     • ${topics.join(" • ")}`);
        }
      });
    }

    // If nothing human-friendly was found, fallback to pretty JSON once
    if (lines.length === 0) {
      try {
        return JSON.stringify(s, null, 2);
      } catch {
        return "";
      }
    }

    return lines.join("\n");
  }

  async function handleSend() {
    if (!message.trim() && uploads.length === 0) return;

    const userMsgParts: string[] = [];
    if (message.trim()) userMsgParts.push(message.trim());
    if (uploads.length > 0) {
      uploads.forEach((u) =>
        userMsgParts.push(`[${getTypeLabel(u.file)}] ${u.file.name}`)
      );
    }

    const combinedUserMsg = userMsgParts.join("\n");
    setChatHistory((prev) => [
      ...prev,
      { role: "user", content: combinedUserMsg },
    ]);

    const currentUploads = uploads;
    setMessage("");
    setUploads([]);

    // Add "thinking..." message
    setChatHistory((prev) => [
      ...prev,
      { role: "assistant", content: "Thinking..." },
    ]);

    try {
      let payload: any = {
        message: message.trim() || "",
        userId: "123",
      };

      // 🧠 If PDF exists, include its path
      const pdfFile = currentUploads.find((u) =>
        u.file.name.toLowerCase().endsWith(".pdf")
      );

      let res: Response;

      if (pdfFile) {
        // ✅ Send the actual file via multipart/form-data (do NOT send local path)
        const form = new FormData();
        form.append("message", message.trim() || "");
        form.append("userId", "123");
        form.append("file", pdfFile.file, pdfFile.file.name);

        res = await fetch("https://inferno-back.onrender.com/api/chat/router", {
          method: "POST",
          body: form, // browser sets Content-Type with boundary
        });
      } else {
        // ✅ Text-only flow remains JSON
        const payload = {
          message: message.trim() || "",
          userId: "123",
        };

        res = await fetch("https://inferno-back.onrender.com/api/chat/router", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) {
        const errText = await res.text().catch(() => "");
        console.error("Router error:", res.status, errText);
        throw new Error(`Router request failed: ${res.status}`);
      }

      const data = await res.json();

      const replyText = data.reply || "No response from AI.";
      const intent = data.intent || "general";
      const emotion = data.emotion || "calm";
      const riskLevel = data.riskLevel || "low";
      const summary = data.summary || "";
      const moduleType = data.moduleType;
      const suggestedPlan: SuggestedPlan | undefined = data.suggestedPlan;

      // Store latest analysis for header + background
      setAnalysis({
        intent,
        emotion,
        riskLevel,
        summary,
        moduleType,
        suggestedPlan,
      });

      // Optional: handle parsed document preview if exists
      let docText =
        data?.data?.text ??
        data?.data?.content ??
        data?.content ??
        data?.text ??
        "";

      // If parser returned structured syllabus, format it as readable text
      if (!docText && data?.data?.syllabus) {
        docText = formatSyllabus(data.data.syllabus);
      }

      const docTitle =
        data?.data?.title ?? data?.title ?? (pdfFile?.file?.name || "Document");

      // 🧠 Replace the "Thinking..." bubble with the main reply + optional doc preview
      setChatHistory((prev) => {
        const next = [...prev];
        if (
          next.length > 0 &&
          next[next.length - 1]?.content === "Thinking..."
        ) {
          next.pop();
        }

        // Main assistant message
        // Main assistant message (with analysis)
        next.push({
          role: "assistant",
          content: replyText,
          analysis: {
            intent,
            emotion,
            riskLevel,
            summary,
            moduleType,
            suggestedPlan,
          },
        });

        // Optional parsed text preview
        if (docText) {
          const preview = String(docText).slice(0, 2000); // prevent flooding UI
          next.push({
            role: "assistant",
            content:
              `📄 ${docTitle}\n\n` +
              preview +
              (docText.length > 2000 ? "\n\n…(truncated)" : ""),
          });
        }

        return next;
      });
    } catch (err) {
      console.error(err);
      setChatHistory((prev) => [
        ...prev.slice(0, -1),
        { role: "assistant", content: "⚠️ Router call failed. Try again." },
      ]);
    }
  }

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
    <div
      className={`flex h-screen text-gray-100 font-inter
      )}`}
    >
      {/* ---- LEFT SIDEBAR ---- */}
      <aside
        className={`${isSidebarOpen ? "w-64" : "w-16"} 
                  bg-[#0f0f0f] border-r border-white/10 flex flex-col justify-between p-4 
                  transition-all duration-500 ease-in-out overflow-hidden`}
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

            {/* Toggle button (hidden when closed) */}
            {isSidebarOpen && (
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="flex items-center justify-center h-7 w-7 rounded hover:bg-white/20 transition"
                aria-label="Toggle sidebar"
              >
                <PanelRight
                  className={`h-4 w-4 text-white transform transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
                                       }`}
                />
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
            </div>
          </div>
        </div>
      </aside>

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
      <main className="flex-1 flex flex-col h-screen justify-between px-10 pb-6 relative">
        {/* ---- MAIN WRAPPER ---- */}
        <div className="flex flex-col justify-between h-full w-full max-w-4xl mx-auto">
          {analysis && (
            <div className="mb-3 flex items-center justify-between text-xs sm:text-sm text-white/70">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-white/10 capitalize">
                  {analysis.emotion || "calm"}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-white/5 text-[10px] sm:text-xs uppercase tracking-wide">
                  Risk: {analysis.riskLevel || "low"}
                </span>
              </div>
              {analysis.moduleType && (
                <span className="text-[11px] sm:text-xs opacity-80">
                  Mode:{" "}
                  <span className="capitalize">{analysis.moduleType}</span>
                </span>
              )}
            </div>
          )}
          {/* ---- HEADER / GREETING ---- */}
          {chatHistory.length === 0 ? (
            // Initial hero/greeting
            <div className="flex flex-col items-center justify-center flex-grow text-center">
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                Welcome, how are you feeling today?
              </h1>
            </div>
          ) : (
            // Chat area
            <div
              ref={chatContainerRef}
              className="
    flex flex-col gap-3 sm:gap-4 
    overflow-y-auto
     hide-scrollbar
    w-full max-w-3xl mx-auto 
    px-1 sm:px-0 pb-8
    h-[calc(100vh-220px)]
  "
            >
              {chatHistory.map((msg, idx) => {
                const safeContent =
                  typeof msg.content === "string"
                    ? msg.content
                    : JSON.stringify(msg.content ?? "");
                const lines = safeContent.split("\n");

                return (
                  <div
                    key={idx}
                    className={`flex w-full ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] sm:max-w-[80%] px-4 py-2 rounded-2xl text-sm sm:text-base leading-relaxed
                                                    ${
                                                      msg.role === "user"
                                                        ? "bg-white/10 text-black rounded-br-sm"
                                                        : "bg-background text-white"
                                                    }`}
                    >
                      {lines.map((line, i) => {
                        // detect if it's a file reference line
                        if (/\[(IMG|PDF|FILE)\]/.test(line)) {
                          const name = line.replace(
                            /\[(IMG|PDF|FILE)\]\s*/,
                            ""
                          );
                          const label = line.match(/\[(IMG|PDF|FILE)\]/)?.[1];
                          const isImage = label === "IMG";
                          const isPDF = label === "PDF";

                          return (
                            <div
                              key={i}
                              className="mt-2 flex items-center gap-3 border border-white/15 bg-white/5 rounded-lg px-3 py-2"
                            >
                              {isImage ? (
                                <FileText className="h-4 w-4 text-white/60" />
                              ) : (
                                <FileText className="h-4 w-4 text-white/60" />
                              )}
                              <div className="flex flex-col">
                                <span className="text-xs sm:text-sm truncate">
                                  {name}
                                </span>
                                {isPDF && (
                                  <span className="text-[10px] text-white/50">
                                    PDF document
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        }

                        // ignore JSON-like strings
                        if (
                          line.trim().startsWith("{") ||
                          line.trim().startsWith("[") ||
                          (line.trim().includes("{") &&
                            line.trim().includes("}"))
                        ) {
                          return null;
                        }

                        // long parsed document
                        if (line.startsWith("📄 ")) {
                          return (
                            <div
                              key={i}
                              className="mt-3 whitespace-pre-wrap text-white/80"
                            >
                              {line}
                            </div>
                          );
                        }

                        // normal line
                        return <p key={i}>{line}</p>;
                      })}

                      {/* 🧠 Module steps from SynapEase */}
                      {msg.role === "assistant" &&
                        msg.analysis?.suggestedPlan &&
                        Array.isArray(msg.analysis.suggestedPlan.steps) &&
                        msg.analysis.suggestedPlan.steps.length > 0 && (
                          <div className="mt-3 space-y-2 text-xs sm:text-sm text-white/90">
                            <ol className="list-decimal list-inside space-y-1">
                              {msg.analysis.suggestedPlan.steps.map(
                                (step, i) => (
                                  <li key={i}>{step}</li>
                                )
                              )}
                            </ol>

                            {msg.analysis.suggestedPlan.note && (
                              <p className="mt-1 text-[11px] sm:text-xs text-white/70">
                                {msg.analysis.suggestedPlan.note}
                              </p>
                            )}
                          </div>
                        )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ---- CHAT / INPUT SECTION ---- */}
          <div className="w-full flex justify-center mb-4">
            <div className="w-[98%] sm:w-[90%] md:max-w-4xl rounded-xl border border-white/10 bg-[rgba(16,16,16,0.5)] shadow-2xl backdrop-blur-lg px-2 py-5 sm:px-4 md:px-6 transition-all duration-500 ease-in-out origin-bottom">
              {/* Uploaded Files */}
              {uploads.length > 0 && (
                <div className="mb-6 sm:mb-7 mt-0.1 sm:mt-1 flex flex-wrap gap-3 justify-start px-2 sm:px-1 transition-all duration-500 ease-in-out">
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
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleSend();
                        }
                      }}
                      placeholder="Ask anything..."
                      className="flex-1 bg-transparent border-none outline-none text-sm sm:text-base text-white/80 placeholder:text-white/40"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-auto shrink-0 relative">
                  <button
                    onClick={handleSend}
                    className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-105"
                    aria-label="Send"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function SidebarItem({
  icon,
  label,
  shortcut,
  active = false,
}: {
  icon: React.ReactNode;
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
