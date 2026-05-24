import Reveal from "@/components/shared/reveal";
import { Sparkles, Shield, CalendarCheck, Heart } from "lucide-react";

const benefits = [
  {
    title: "Atención Elite",
    description:
      "Personal altamente capacitado y apasionado por el bienestar animal.",
    icon: Heart,
  },
  {
    title: "Catálogo Curado",
    description:
      "Selección exclusiva de productos premium para la salud de tu mascota.",
    icon: Sparkles,
  },
  {
    title: "Smart Booking",
    description:
      "Flujo de reserva inteligente e integrado con Google para tu comodidad.",
    icon: CalendarCheck,
  },
  {
    title: "Filosofía Familiar",
    description:
      "Cada mascota es tratada con la misma dedicación que un miembro de casa.",
    icon: Shield,
  },
];

export default function Benefits() {
  return (
    <section className="bg-white py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center flex flex-col items-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500">
              <Heart className="h-3 w-3" strokeWidth={2} />
              ¿Por qué Pampaw?
            </span>

            <h2 className="mt-8 text-4xl font-extrabold tracking-tight text-neutral-900 md:text-5xl">
              Un estándar <br />
              <span className="text-neutral-300">Superior de cuidado.</span>
            </h2>

            <p className="mx-auto mt-8 max-w-xl text-lg font-medium leading-relaxed text-neutral-500">
              En Pampaw nos enfocamos en brindar bienestar, confianza y una
              experiencia excepcional para cada mascota.
            </p>
          </div>
        </Reveal>

        <div className="mt-24 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <Reveal key={benefit.title} delay={i * 100} y={28}>
                <div className="group relative rounded-[2rem] border border-neutral-100 bg-white p-10 transition-all duration-300 hover:border-neutral-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-600 transition-all duration-300 group-hover:bg-neutral-900 group-hover:text-white mb-6">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-black tracking-tight text-neutral-900">
                    {benefit.title}
                  </h3>
                  <p className="mt-5 text-base font-medium leading-relaxed text-neutral-500">
                    {benefit.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
