"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
gsap.registerPlugin(ScrollTrigger);

const navItems = [
  // { name: "Tools", href: "#" },
  { name: "Pricing", href: "#" },
  { name: "About", href: "#" },
  { name: "Contact Us", href: "#" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const [isAuthed, setIsAuthed] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement | null>(null);
  const user = { name: "Agrim", initials: "A", credits: 5 };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    // explicit starting styles
    gsap.set(nav, {
      css: {
        backdropFilter: "blur(4px)",
        backgroundColor: "rgba(16,16,16,0.2)",
      },
    });

    // animate both blur & opacity on scroll
    gsap.to(nav, {
      css: {
        backdropFilter: "blur(20px)",
        backgroundColor: "rgba(16,16,16,0.55)",
      },
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    return () => ScrollTrigger.killAll();
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("demo-authed");
    if (saved === "1") setIsAuthed(true);
  }, []);
  useEffect(() => {
    localStorage.setItem("demo-authed", isAuthed ? "1" : "0");
  }, [isAuthed]);

  // close dropdown on outside click
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey && e.key.toLowerCase() === "u") setIsAuthed((v) => !v);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 h-[72px] shadow-2xl transition-all duration-300 bg-[rgba(16,16,16,0.2)] backdrop-blur-[4px] will-change-[backdrop-filter,background-color]"
    >
      <div className="mx-auto flex h-full w-full max-w-[1240px] items-center justify-between px-8">
        <div className="flex-1 flex items-center">
          <Link href="/" className="flex items-center gap-2.5">
            <img
              src="/SynapEase.svg"
              alt="SynapEase Logo"
              className="h-7 w-auto md:h-7"
            />
          </Link>
        </div>

        <nav className="flex-1 hidden md:flex justify-center">
          <ul className="flex items-center gap-10">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-base text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex-1 hidden md:flex items-center justify-end gap-6">
          {!isAuthed ? (
            <>
              <a
                href="/auth/sign-in"
                className="text-base text-muted-foreground transition-colors hover:text-foreground"
              >
                Sign in
              </a>
              <a
                href="/auth/sign-up"
                className="rounded-lg bg-white px-4 py-2 text-base font-medium text-black transition-colors hover:bg-neutral-200"
              >
                Start for Free
              </a>
            </>
          ) : (
            <div ref={userMenuRef} className="relative">
              <button
                onClick={() => setUserMenuOpen((v) => !v)}
                className="flex items-center gap-3 rounded-2xl bg-neutral-900/70 px-3 py-2 text-sm hover:bg-neutral-800 transition-colors"
              >
                <span className="grid h-7 w-7 place-items-center rounded-xl bg-violet-600 text-white text-sm font-semibold">
                  {user.initials}
                </span>
                <span className="text-sm">{user.name}</span>
                <ChevronDown size={16} className="opacity-70" />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-72 rounded-xl border border-white/10 bg-neutral-950/95 backdrop-blur p-3 shadow-xl">
                  <div className="flex items-center gap-3 rounded-lg p-3">
                    <div className="grid h-8 w-8 place-items-center rounded-lg bg-violet-600 text-white text-sm font-semibold">
                      {user.initials}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{user.name}</div>
                      <div className="text-xs text-muted-foreground">
                        Free • {user.credits} credits left
                      </div>
                    </div>
                  </div>

                  <div className="my-2 h-px bg-white/10" />

                  <ul className="text-sm">
                    <li>
                      <Link
                        href="/dashboard"
                        className="block rounded-md px-3 py-2 hover:bg-white/5"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/settings"
                        className="block rounded-md px-3 py-2 hover:bg-white/5"
                      >
                        Settings
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/invite"
                        className="block rounded-md px-3 py-2 hover:bg-white/5"
                      >
                        Invite
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setIsAuthed(false);
                          setUserMenuOpen(false);
                        }}
                        className="w-full text-left rounded-md px-3 py-2 hover:bg-white/5"
                      >
                        Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="justify-self-end md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            className="text-foreground"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-[72px] left-0 h-screen w-full bg-background md:hidden">
          <div className="flex flex-col items-center gap-8 pt-12">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-xl text-muted-foreground"
                onClick={closeMenu}
              >
                {item.name}
              </Link>
            ))}
            <div className="mt-8 flex flex-col items-center gap-6">
              <a
                href="/auth/sign-in"
                className="text-xl text-muted-foreground"
                onClick={closeMenu}
              >
                Sign in
              </a>
              <a
                href="/auth/sign-up"
                className="rounded-lg bg-white px-8 py-3 text-lg font-medium text-black"
                onClick={closeMenu}
              >
                Start for Free
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
