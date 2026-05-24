import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { User } from "lucide-react";
import FinalDataForm from "./final-data-form";

export const metadata = {
  title: "Reservar Cita - Datos Finales | Pampaw",
  description: "Completa tus datos para confirmar tu cita.",
};

export default async function AppointmentDataPage({
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
    where: { id: serviceId }
  });

  if (!service) {
    redirect("/agendar-cita");
  }

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
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-900 text-white text-[10px] font-black">3</span>
            <span className="text-[10px] font-black uppercase tracking-[0.15em] text-neutral-900 hidden xs:inline">Datos</span>
          </div>
        </div>

        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500">
            <User className="h-3 w-3" strokeWidth={2} />
            Paso 3 de 3
          </span>
          <h1 className="mt-6 text-3xl font-black tracking-tighter text-neutral-900 md:text-4xl">
            Último paso para <br className="sm:hidden" />
            <span className="text-neutral-300">completar</span>
          </h1>
          <p className="mt-3 text-sm text-neutral-500 font-medium">
            <span className="text-neutral-400">Servicio:</span>{' '}
            <span className="text-neutral-900 font-bold">{service.name}</span>
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 md:p-8 border border-neutral-200/60 shadow-sm">
          <FinalDataForm serviceId={serviceId} appointmentDate={date} />
        </div>
      </div>
    </main>
  );
}
