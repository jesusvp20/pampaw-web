import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import ConfirmarReserva from "./confirmar-reserva";

export const metadata = {
  title: "Confirmar Reserva | Pampaw",
  description: "Revisa los detalles de tu cita antes de confirmar.",
};

export default async function ConfirmarPage({
  searchParams,
}: {
  searchParams: { serviceId?: string; date?: string };
}) {
  const params = await searchParams;
  const { serviceId, date } = params;

  if (!serviceId || !date) {
    redirect("/agendar-cita");
  }

  const service = await prisma.service.findUnique({
    where: { id: serviceId },
  });

  if (!service) {
    redirect("/agendar-cita");
  }

  const appointmentDate = new Date(date);
  const dateStr = appointmentDate.toLocaleDateString("es-CO", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const timeStr = appointmentDate.toLocaleTimeString("es-CO", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <main className="min-h-screen bg-[#fbfaf8] pb-24 pt-28">
      <div className="mx-auto max-w-2xl px-6">
        {/* Stepper */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-12 flex-wrap">
          <Link href="/agendar-cita" className="flex items-center gap-1.5 sm:gap-2.5 group">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-white text-[10px] font-black">✓</span>
            <span className="text-[10px] font-black uppercase tracking-[0.15em] text-emerald-600 group-hover:text-neutral-900 transition-colors hidden xs:inline">Servicio</span>
          </Link>
          <div className="w-6 sm:w-10 h-px bg-neutral-200" />
          <Link href={`/agendar-cita/fecha?serviceId=${serviceId}`} className="flex items-center gap-1.5 sm:gap-2.5 group">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-white text-[10px] font-black">✓</span>
            <span className="text-[10px] font-black uppercase tracking-[0.15em] text-emerald-600 group-hover:text-neutral-900 transition-colors hidden xs:inline">Fecha</span>
          </Link>
          <div className="w-6 sm:w-10 h-px bg-neutral-200" />
          <Link href={`/agendar-cita/datos?serviceId=${serviceId}&date=${date}`} className="flex items-center gap-1.5 sm:gap-2.5 group">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-white text-[10px] font-black">✓</span>
            <span className="text-[10px] font-black uppercase tracking-[0.15em] text-emerald-600 group-hover:text-neutral-900 transition-colors hidden xs:inline">Datos</span>
          </Link>
          <div className="w-6 sm:w-10 h-px bg-neutral-200" />
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-900 text-white text-[10px] font-black">4</span>
            <span className="text-[10px] font-black uppercase tracking-[0.15em] text-neutral-900 hidden xs:inline">Confirmar</span>
          </div>
        </div>

        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500">
            <CheckCircle className="h-3 w-3" strokeWidth={2} />
            Paso 4 de 4
          </span>
          <h1 className="mt-6 text-3xl font-black tracking-tighter text-neutral-900 md:text-4xl">
            Revisa y <br className="sm:hidden" />
            <span className="text-neutral-300">confirma</span>
          </h1>
          <p className="mt-3 text-sm text-neutral-500 font-medium">
            Verifica que todos los datos sean correctos antes de agendar.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 md:p-8 border border-neutral-200/60 shadow-sm">
          <div className="space-y-6">
            <div className="rounded-xl bg-neutral-50 border border-neutral-100 p-5 space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 text-center">
                Resumen de la Cita
              </h3>

              <div className="grid gap-4">
                <div className="flex items-center justify-between rounded-xl bg-white px-5 py-4 border border-neutral-100">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Servicio</span>
                  <span className="text-sm font-black text-neutral-900">{service.name}</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-white px-5 py-4 border border-neutral-100">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Fecha</span>
                  <span className="text-sm font-black text-neutral-900">{dateStr}</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-white px-5 py-4 border border-neutral-100">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Hora</span>
                  <span className="text-sm font-black text-neutral-900">{timeStr}</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-white px-5 py-4 border border-neutral-100">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Precio</span>
                  <span className="text-sm font-black text-neutral-900">${service.price.toLocaleString("es-CO")}</span>
                </div>
              </div>
            </div>

            <ConfirmarReserva serviceId={serviceId} appointmentDate={date} />
          </div>
        </div>
      </div>
    </main>
  );
}
