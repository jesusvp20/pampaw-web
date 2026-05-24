"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Home, Sparkles, ShoppingBag, Tag, CalendarClock, Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isHeroVisible, setIsHeroVisible] = useState(pathname === "/");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      if (pathname !== "/") {
        setIsHeroVisible(false);
        return;
      }
      setIsHeroVisible(window.scrollY < window.innerHeight * 0.85);

      const sections = ["servicios", "promos", "petshop", "galeria"];
      let current = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 200) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const navItems = [
    { name: "Inicio", href: "/", icon: Home, section: "" },
    { name: "Servicios", href: "/#servicios", icon: Sparkles, section: "servicios" },
    { name: "Petshop", href: "/petshop", icon: ShoppingBag, section: "petshop" },
    { name: "Promos", href: "/#promos", icon: Tag, section: "promos" },
    { name: "Galería", href: "/#galeria", icon: Sparkles, section: "galeria" },
  ];

  return (
    <>
      <header
        className={`fixed z-50 w-full transition-all duration-500 ${
          isHeroVisible ? "top-4" : "top-0"
        }`}
      >
        <div
          className={`mx-auto max-w-7xl px-4 transition-all duration-500 ${
            isHeroVisible ? "px-4 sm:px-6" : "px-4 sm:px-6"
          }`}
        >
          <div
            className={`flex items-center justify-between transition-all duration-500 ${
              isHeroVisible
                ? "rounded-2xl border border-white/10 bg-black/40 px-6 py-3"
                : "rounded-2xl bg-white/90 px-6 py-3"
            }`}
          >
            <Link href="/" className="flex items-center gap-3 group">
              <img
                src="/images/logo-no-bg.png"
                alt="Pampaw Logo"
                className={`h-10 w-auto transition-all duration-300 ${
                  isHeroVisible ? "brightness-0 invert" : ""
                }`}
              />
              <div className="flex flex-col">
                <h1
                  className={`text-xl font-black tracking-tighter transition-colors duration-300 leading-none ${
                    isHeroVisible ? "text-white" : "text-neutral-900"
                  }`}
                >
                  PAMPAW
                </h1>
                <span
                  className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 mt-0.5 ${
                    isHeroVisible ? "text-white/50" : "text-neutral-400"
                  }`}
                >
                  Pet Store & Spa
                </span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.section === activeSection;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group relative flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300 ${
                      isHeroVisible
                        ? isActive
                          ? "text-white"
                          : "text-white/60 hover:text-white"
                        : isActive
                        ? "text-neutral-900"
                        : "text-neutral-500 hover:text-neutral-900"
                    }`}
                  >
                    {isActive && (
                      <span
                        className={`absolute inset-0 rounded-full transition-colors duration-300 ${
                          isHeroVisible ? "bg-white/10" : "bg-neutral-100"
                        }`}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                      {item.name}
                    </span>
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-3">
              <Link
                href="/agendar-cita"
                className={`hidden sm:flex items-center gap-2 rounded-full px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300 ${
                  isHeroVisible
                    ? "bg-white text-black hover:bg-neutral-200 hover:scale-105 active:scale-95"
                    : "bg-neutral-900 text-white hover:bg-neutral-800 hover:scale-105 active:scale-95"
                }`}
              >
                <CalendarClock className="h-3.5 w-3.5" strokeWidth={2} />
                Reservar
              </Link>

              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className={`lg:hidden flex items-center justify-center rounded-full p-3 transition-colors duration-300 ${
                  isHeroVisible
                    ? "text-white hover:bg-white/10"
                    : "text-neutral-700 hover:bg-neutral-100"
                }`}
                aria-label="Toggle menu"
              >
                {isMobileOpen ? (
                  <X className="h-5 w-5" strokeWidth={2} />
                ) : (
                  <Menu className="h-5 w-5" strokeWidth={2} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`mx-auto max-w-7xl px-4 transition-all duration-400 overflow-hidden ${
            isMobileOpen ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"
          }`}
        >
          <div
            className={`rounded-2xl border px-4 py-4 ${
              isHeroVisible
                ? "border-white/10 bg-black/60"
                : "border-neutral-200/80 bg-white/95"
            }`}
          >
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-[13px] font-bold uppercase tracking-wider transition-colors duration-200 ${
                      isHeroVisible
                        ? "text-white/70 hover:text-white hover:bg-white/10"
                        : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
                    }`}
                  >
                    <Icon className="h-4 w-4" strokeWidth={2} />
                    {item.name}
                  </Link>
                );
              })}
              <Link
                href="/agendar-cita"
                className={`mt-2 flex items-center gap-3 rounded-xl px-4 py-3 text-[13px] font-bold uppercase tracking-wider transition-colors duration-200 ${
                  isHeroVisible
                    ? "bg-white/10 text-white hover:bg-white/20"
                    : "bg-neutral-900 text-white hover:bg-neutral-800"
                }`}
              >
                <CalendarClock className="h-4 w-4" strokeWidth={2} />
                Reservar Cita
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
}
