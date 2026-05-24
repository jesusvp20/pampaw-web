import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Sparkles, Stethoscope, Hotel, Clock, DollarSign, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Reservar Cita - Seleccionar Servicio | Pampaw",
  description: "Elige el servicio que deseas agendar para tu mascota.",
};

const categoryMeta: Record<string, { icon: React.ReactNode; gradient: string; badge: string }> = {
  Spa: {
    icon: <Sparkles className="h-5 w-5" strokeWidth={1.5} />,
    gradient: "from-amber-50 via-amber-50/50 to-white",
    badge: "bg-amber-500/10 text-amber-700 border-amber-200",
  },
  Veterinaria: {
    icon: <Stethoscope className="h-5 w-5" strokeWidth={1.5} />,
    gradient: "from-blue-50 via-blue-50/50 to-white",
    badge: "bg-blue-500/10 text-blue-700 border-blue-200",
  },
  Guardería: {
    icon: <Hotel className="h-5 w-5" strokeWidth={1.5} />,
    gradient: "from-emerald-50 via-emerald-50/50 to-white",
    badge: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
  },
};

export default async function AppointmentServiceSelectionPage() {
  const services = await prisma.service.findMany({
    orderBy: { category: "asc" }
  });

  const groupedServices = services.reduce((acc, service) => {
    if (!acc[service.category]) acc[service.category] = [];
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, typeof services>);

  return (
    <main className="min-h-screen bg-[#fbfaf8] pb-24 pt-28">
      <div className="mx-auto max-w-3xl px-6">
        {/* Stepper */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-12 flex-wrap">
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-900 text-white text-[10px] font-black">1</span>
            <span className="text-[10px] font-black uppercase tracking-[0.15em] text-neutral-900 hidden xs:inline">Servicio</span>
          </div>
          <div className="w-6 sm:w-10 h-px bg-neutral-200" />
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-200 text-neutral-400 text-[10px] font-black">2</span>
            <span className="text-[10px] font-black uppercase tracking-[0.15em] text-neutral-300 hidden xs:inline">Fecha</span>
          </div>
          <div className="w-6 sm:w-10 h-px bg-neutral-200" />
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-200 text-neutral-400 text-[10px] font-black">3</span>
            <span className="text-[10px] font-black uppercase tracking-[0.15em] text-neutral-300 hidden xs:inline">Datos</span>
          </div>
          <div className="w-6 sm:w-10 h-px bg-neutral-200" />
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-200 text-neutral-400 text-[10px] font-black">4</span>
            <span className="text-[10px] font-black uppercase tracking-[0.15em] text-neutral-300 hidden xs:inline">Confirmar</span>
          </div>
        </div>

        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500">
            Paso 1 de 4
          </span>
          <h1 className="mt-6 text-3xl font-black tracking-tighter text-neutral-900 md:text-4xl">
            ¿Qué necesita <br className="sm:hidden" />
            <span className="text-neutral-300">tu mascota?</span>
          </h1>
          <p className="mt-3 text-sm text-neutral-500 font-medium">Selecciona el servicio para agendar tu cita.</p>
        </div>

        <div className="space-y-10">
          {Object.entries(groupedServices).map(([category, categoryServices]) => {
            const meta = categoryMeta[category] || { icon: null, gradient: "from-neutral-50 to-white", badge: "bg-neutral-100 text-neutral-600" };
            return (
              <div key={category}>
                <div className="flex items-center gap-3 mb-5">
                  <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${meta.badge}`}>
                    {meta.icon}
                    {category}
                  </span>
                  <div className="h-px flex-1 bg-neutral-200" />
                </div>

                <div className="grid gap-4">
                  {categoryServices.map((service) => (
                    <Link
                      key={service.id}
                      href={`/agendar-cita/fecha?serviceId=${service.id}`}
                      className={`group relative flex items-center justify-between rounded-2xl bg-gradient-to-b ${meta.gradient} p-6 border border-neutral-200/60 transition-all duration-300 hover:border-neutral-300 hover:shadow-lg hover:-translate-y-0.5`}
                    >
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[17px] font-black tracking-tight text-neutral-900">{service.name}</h3>
                        <p className="mt-1 text-sm text-neutral-500 line-clamp-1">{service.description}</p>
                        <div className="mt-4 flex items-center gap-4 text-[11px] font-semibold text-neutral-400">
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" strokeWidth={2} />
                            {service.duration} min
                          </span>
                          <span className="flex items-center gap-1.5">
                            <DollarSign className="w-3.5 h-3.5" strokeWidth={2} />
                            ${service.price.toLocaleString("es-CO")}
                          </span>
                        </div>
                      </div>

                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white border border-neutral-200 text-neutral-400 transition-all duration-300 group-hover:bg-neutral-900 group-hover:border-neutral-900 group-hover:text-white group-hover:scale-110 ml-6 shadow-sm">
                        <ArrowRight className="h-5 w-5" strokeWidth={2.5} />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
