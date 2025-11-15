"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import {
  Sparkles,
  Phone,
  Podcast,
  ChevronDown,
  Play,
  ToolCase,
  ArrowUp,
  ArrowUp01,
  ArrowUp01Icon,
  Upload,
  ChevronRight,
} from "lucide-react";
import { useRouter } from "next/navigation";

const USFlagIcon = () => (
  <div
    className="h-5 w-5 flex-shrink-0 rounded-full bg-cover bg-center"
    style={{
      backgroundImage: `url('https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/f23a91fa-945a-4e62-b3d4-c2668a3836aa-cartesia-ai/assets/images/JbrbaWl5kw9vXgw8Cb4WY4NMw-17.svg')`,
    }}
    role="img"
    aria-label="US Flag"
  ></div>
);

const HeroSection = () => {
  const router = useRouter();
  const wave1Ref = useRef<SVGPathElement>(null);
  const wave2Ref = useRef<SVGPathElement>(null);
  const svgScope = useRef<HTMLDivElement | null>(null);
  const [message, setMessage] = useState("");
  type UploadItem = {
    id: string;
    file: File;
    status: "uploading" | "done" | "error";
  };

  const [uploads, setUploads] = useState<UploadItem[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);

  // helper: label like PDF, JPG, PNG, TSX, etc.
  const getTypeLabel = (file: File) => {
    const ext = file.name.split(".").pop()?.toUpperCase() || "FILE";
    // quick overrides for common types
    if (file.type === "application/pdf") return "PDF";
    return ext;
  };

  // mark an item done (fake async for now — replace with your real upload callback)
  const markDone = (id: string) => {
    setTimeout(() => {
      setUploads((prev) =>
        prev.map((u) => (u.id === id ? { ...u, status: "done" } : u))
      );
    }, 800);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const bg = bgRef.current;
      if (bg) {
        gsap.set(bg, { opacity: 0 }); // start invisible

        gsap.to(bg, {
          opacity: 1,
          duration: 1.1, // fade-in length
          delay: 0.2, // when to start
          ease: "power1.out", // soft easing, no jerk
        });
      }
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const wave1 = wave1Ref.current;
      const wave2 = wave2Ref.current;
      if (!wave1 || !wave2) return;

      // gentle vertical breathing
      gsap.to([wave1, wave2], {
        transformOrigin: "50% 100%",
        scaleY: 1.1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        duration: 2.5,
      });

      // subtle horizontal drift
      gsap.to("svg", {
        xPercent: -2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        duration: 6,
      });
    }, svgScope);

    return () => ctx.revert();
  }, []);

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
    <section className="relative flex w-full flex-col items-center min-h-[100dvh] sm:min-h-0 overflow-x-hidden bg-[#181818] pt-[120px] pb-24 text-center">
      {/* <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center opacity-0"
        style={{
          backgroundImage: "url('/background4.jpg')",
        }}
      ></div> */}

      <div className="relative z-10 flex w-full max-w-7xl flex-col items-center px-6">
        <h1 className="max-w-4xl text-5xl font-bold leading-[1.1] tracking-tighter text-white md:text-[70px]">
          The AI that truly gets you.
        </h1>
        <p className="mt-6 max-w-[640px] text-lg leading-[1.6] text-[#b3b3b3] md:text-xl">
          Real-time emotion detection, adaptive support, and safe human circles
          — all powered by AI built to understand you.
        </p>
      </div>

      <div className="relative mt-10 w-full overflow-hidden flex-1">
        <div className="relative w-full h-full min-h-[320px] sm:min-h-[380px] md:aspect-[1239/350] md:h-auto">
          {/* Custom SVG Wave replacing the animated bars */}
          <div className="absolute inset-0" ref={svgScope}>
            <svg
              width="110%"
              height="110%"
              preserveAspectRatio="none"
              viewBox="0 0 1440 590"
              xmlns="http://www.w3.org/2000/svg"
              className="transition duration-300 ease-in-out delay-150 scale-y-[1.4] md:scale-y-[1.25] -translate-x-[5%]"
            >
              <defs>
                <linearGradient
                  id="gradient"
                  x1="100%"
                  y1="54%"
                  x2="0%"
                  y2="46%"
                >
                  <stop offset="5%" stopColor="#fcb900" />
                  <stop offset="95%" stopColor="#9900ef" />
                </linearGradient>
              </defs>
              <path
                ref={wave1Ref}
                d="M 0,600 L 0,150 C 120,146.73684210526315 240,143.4736842105263 324,136 C 408,128.5263157894737 456,116.84210526315792 531,136 C 606,155.15789473684208 708,205.1578947368421 830,207 C 952,208.8421052631579 1094,162.5263157894737 1199,145 C 1304,127.47368421052632 1372,138.73684210526315 1440,150 L 1440,600 L 0,600 Z"
                stroke="none"
                fill="url(#gradient)"
                fillOpacity="0.53"
              />
              <path
                ref={wave2Ref}
                d="M 0,600 L 0,350 C 96.59330143540669,313.1961722488038 193.18660287081337,276.39234449760767 279,305 C 364.8133971291866,333.60765550239233 439.8468899521532,427.6267942583732 529,420 C 618.1531100478468,412.3732057416268 721.4258373205741,303.1004784688995 824,277 C 926.5741626794259,250.89952153110048 1028.4497607655503,307.9712918660287 1131,334 C 1233.5502392344497,360.0287081339713 1336.7751196172248,355.0143540669857 1440,350 L 1440,600 L 0,600 Z"
                stroke="none"
                fill="url(#gradient)"
                fillOpacity="1"
              />
            </svg>
            <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-transparent to-transparent pointer-events-none" />
          </div>

          <div className="absolute inset-0 flex items-center justify-center p-4 bg-gradient-to-t from-[#181818]/98 to-transparent">
            <div className="w-[98%] sm:w-[90%] md:max-w-4xl scale-[0.96] sm:scale-100 rounded-xl border border-white/10 bg-[rgba(16,16,16,0.5)] shadow-2xl backdrop-blur-lg px-2 py-7 sm:px-4 sm:py-4 md:px-6 md:py-5 transition-all duration-500 ease-in-out origin-bottom">
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

              <div className="flex flex-row flex-wrap items-start gap-3 sm:gap-4 md:flex-nowrap md:items-center md:gap-6">
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

                    // simulate upload completion (replace with your real upload promise)
                    items.forEach((it) => markDone(it.id));
                  }}
                  className="hidden"
                />

                <div className="flex flex-1 min-w-0 flex-col gap-2">
                  <div className="flex items-center gap-3 sm:gap-5">
                    {" "}
                    <div ref={menuRef} className="relative">
                      <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition leading-none"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5 text-white"
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
                          <button className="w-full flex items-center justify-between gap-2 px-3 py-2 text-sm text-white/80 hover:bg-white/5 text-left">
                            <div className="flex items-center gap-2">
                              <ToolCase className="h-4 w-4 text-white/70" />
                              Tools
                            </div>
                            <ChevronRight className="h-4 w-4 text-white/60" />
                          </button>
                        </div>
                      )}
                    </div>
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="How are you feeling right now?"
                      className="flex-1 bg-transparent border-none outline-none text-sm sm:text-base text-white/80 placeholder:text-white/40"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-auto shrink-0 relative">
                  <button
                    onClick={() => router.push("/chat")}
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-105"
                  >
                    <ArrowUp className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
