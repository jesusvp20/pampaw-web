import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { ArrowLeft, Calendar } from "lucide-react";
import DateAndTimeSelector from "@/components/appointments/date-and-time-selector";

export const metadata = {
  title: "Reservar Cita - Seleccionar Fecha | Pampaw",
  description: "Elige la fecha y hora para la cita de tu mascota.",
};

export default async function AppointmentDateSelectionPage({
  searchParams,
}: {
  searchParams: { serviceId?: string };
}) {
  const params = await searchParams;
  const serviceId = params.serviceId;

  if (!serviceId) {
    redirect("/agendar-cita");
  }

  const service = await prisma.service.findUnique({
    where: { id: serviceId }
  });

  if (!service) {
    redirect("/agendar-cita");
  }

  const now = new Date();
  const startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  const appointments = await prisma.appointment.findMany({
    where: {
      appointment: {
        gte: startDate,
      },
      status: {
        not: "cancelled",
      },
    },
    include: {
      service: true,
    },
  });

  const serializedAppointments = appointments.map((app) => ({
    id: app.id,
    appointment: app.appointment.toISOString(),
    service: {
      id: app.service.id,
      name: app.service.name,
      duration: app.service.duration,
    },
  }));

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
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-900 text-white text-[10px] font-black">2</span>
            <span className="text-[10px] font-black uppercase tracking-[0.15em] text-neutral-900 hidden xs:inline">Fecha</span>
          </div>
          <div className="w-6 sm:w-10 h-px bg-neutral-200" />
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-200 text-neutral-400 text-[10px] font-black">3</span>
            <span className="text-[10px] font-black uppercase tracking-[0.15em] text-neutral-300 hidden xs:inline">Datos</span>
          </div>
        </div>

        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500">
            <Calendar className="h-3 w-3" strokeWidth={2} />
            Paso 2 de 3
          </span>
          <h1 className="mt-6 text-3xl font-black tracking-tighter text-neutral-900 md:text-4xl">
            ¿Cuándo te <br className="sm:hidden" />
            <span className="text-neutral-300">esperamos?</span>
          </h1>
          <p className="mt-3 text-sm text-neutral-500 font-medium">
            <span className="text-neutral-400">Servicio:</span>{' '}
            <span className="text-neutral-900 font-bold">{service.name}</span>
            {' — '}
            <span className="text-neutral-400">${service.price.toLocaleString("es-CO")}</span>
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 md:p-8 border border-neutral-200/60 shadow-sm">
          <DateAndTimeSelector
            serviceId={serviceId}
            serviceName={service.name}
            serviceDuration={service.duration}
            existingAppointments={serializedAppointments}
          />
        </div>
      </div>
    </main>
  );
}
