import ServicesGrid from "./services-grid";
import Reveal from "@/components/shared/reveal";
import { Sparkles } from "lucide-react";

type Service = {
  id: string;
  name: string;
  category: string;
  description: string | null;
  price: number;
};

type ServicesSectionProps = {
  services: Service[];
};

export default function ServicesSection({
  services,
}: ServicesSectionProps) {
  return (
    <section id="servicios" className="relative bg-white py-32 overflow-hidden">
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-gradient-to-bl from-neutral-100/60 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 -translate-y-1/4 -translate-x-1/4 w-80 h-80 bg-gradient-to-tr from-neutral-100/40 to-transparent rounded-full blur-3xl" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-neutral-100 pb-12">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                <Sparkles className="h-3 w-3" strokeWidth={2} />
                Nuestra Experiencia
              </span>
              <h3 className="mt-6 text-4xl font-extrabold tracking-tight text-neutral-900 md:text-5xl">
                Cuidado Integral <br />
                <span className="text-neutral-300">& Servicios Premium</span>
              </h3>
            </div>
            <p className="max-w-md text-lg text-neutral-500 font-medium leading-relaxed">
              Desde spa especializado hasta atención veterinaria avanzada,
              ofrecemos todo lo que tu mascota necesita bajo un mismo techo.
            </p>
          </div>
        </Reveal>

        <div className="mt-16">
          <ServicesGrid services={services} />
        </div>
      </div>
    </section>
  );
}
