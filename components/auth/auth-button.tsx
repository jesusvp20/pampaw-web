"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { User } from "lucide-react";

export default function AuthButton() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("pampaw_profile");
    setLoggedIn(!!saved);
  }, []);

  if (loggedIn) {
    return (
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-[10px] font-bold uppercase tracking-widest text-white/80 transition-all duration-300 hover:bg-white/10 hover:text-white hover:border-white/40 active:scale-95"
      >
        <User className="h-3.5 w-3.5" strokeWidth={2} />
        Mi Cuenta
      </Link>
    );
  }

  return (
    <Link
      href="/login"
      className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-[10px] font-bold uppercase tracking-widest text-white/80 transition-all duration-300 hover:bg-white/10 hover:text-white hover:border-white/40 active:scale-95"
    >
      <User className="h-3.5 w-3.5" strokeWidth={2} />
      Mi Cuenta
    </Link>
  );
}
