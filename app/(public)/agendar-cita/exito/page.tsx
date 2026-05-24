"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CheckCircle, ArrowLeft, LayoutDashboard } from "lucide-react";

export default function SuccessPage() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name");
    const phone = params.get("phone");
    if (name && phone) {
      localStorage.setItem("pampaw_profile", JSON.stringify({ name, phone }));
    }
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fbfaf8] px-6">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50">
          <CheckCircle className="h-10 w-10 text-emerald-500" strokeWidth={1.5} />
        </div>

        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-700">
          Reserva Confirmada
        </span>

        <h1 className="mt-6 text-4xl font-black tracking-tighter text-neutral-900 leading-[1.1]">
          ¡Todo listo para
          <br />
          <span className="text-neutral-300">tu mascota!</span>
        </h1>

        <p className="mt-5 text-base font-medium leading-relaxed text-neutral-500">
          Tu cita ha sido agendada con éxito. Te esperamos pronto en Pampaw.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-10 py-3.5 text-[10px] font-black uppercase tracking-[0.3em] text-white transition-all duration-300 hover:bg-neutral-800 hover:shadow-lg active:scale-[0.97]"
          >
            <LayoutDashboard className="h-3.5 w-3.5" strokeWidth={2} />
            Ir a mi Dashboard
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-8 py-3.5 text-[10px] font-black uppercase tracking-[0.3em] text-neutral-600 transition-all duration-300 hover:border-neutral-400 hover:text-neutral-900 active:scale-[0.97]"
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
            Volver al Inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
