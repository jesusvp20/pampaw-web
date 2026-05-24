"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, PawPrint, ArrowLeft } from "lucide-react";
import GoogleAuthButton from "@/components/appointments/google-auth-button";

export default function LoginPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    localStorage.setItem("pampaw_profile", JSON.stringify({
      name: name.trim(),
      phone: phone.trim(),
    }));
    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen bg-[#fbfaf8] flex items-center justify-center px-6 py-24">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-neutral-400 transition-colors hover:text-neutral-900 mb-10"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
          Volver al inicio
        </Link>

        <div className="text-center mb-10">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-900">
            <PawPrint className="h-7 w-7 text-white" strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl font-black tracking-tighter text-neutral-900">
            Mi <span className="text-neutral-300">Cuenta</span>
          </h1>
          <p className="mt-3 text-sm text-neutral-500 font-medium">
            Inicia sesión o regístrate para gestionar tus citas y mascotas.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 md:p-8 border border-neutral-200/60 shadow-sm space-y-6">
          <div className="space-y-4">
            <p className="text-center text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">
              Entra con Google
            </p>
            <GoogleAuthButton />
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-[9px] font-black uppercase tracking-[0.2em] text-neutral-400">
                O con tus datos
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">
                Tu Nombre
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Ej: Juan Pérez"
                className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3.5 text-sm outline-none transition-all focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900/10"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">
                Teléfono
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder="Ej: 3001234567"
                className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3.5 text-sm outline-none transition-all focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900/10"
              />
            </div>
            <button
              type="submit"
              className="mt-2 w-full rounded-full bg-neutral-900 px-8 py-4 text-[10px] font-black uppercase tracking-[0.35em] text-white transition-all duration-300 hover:bg-neutral-800 hover:shadow-lg active:scale-[0.97]"
            >
              <span className="flex items-center justify-center gap-2">
                <User className="h-3.5 w-3.5" strokeWidth={2} />
                Entrar
              </span>
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
