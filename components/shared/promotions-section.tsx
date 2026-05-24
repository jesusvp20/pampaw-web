import Link from "next/link";
import { ArrowRight, Tag, Sparkles } from "lucide-react";
import Reveal from "@/components/shared/reveal";

interface PromotionsSectionProps {
  promotions: any[];
}

export default function PromotionsSection({ promotions }: PromotionsSectionProps) {
  const displayPromos = promotions.length > 0 ? promotions : [
    {
      name: "Spa & Bienestar",
      description: "Descubre nuestras tarifas especiales para consentir a tu mascota con los mejores servicios de grooming.",
      gradient: "from-amber-50 to-amber-100/50",
      badge: "spa",
    },
    {
      name: "Plan Salud Pampaw",
      description: "Conoce los beneficios de nuestros planes veterinarios diseñados para cada etapa de vida.",
      gradient: "from-blue-50 to-blue-100/50",
      badge: "salud",
    },
    {
      name: "Petshop Premium",
      description: "Explora las promociones exclusivas en alimentos de alta gama y accesorios seleccionados.",
      gradient: "from-emerald-50 to-emerald-100/50",
      badge: "shop",
    },
  ];

  const badgeStyles: Record<string, string> = {
    spa: "bg-amber-500/10 text-amber-700 border-amber-200",
    salud: "bg-blue-500/10 text-blue-700 border-blue-200",
    shop: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
  };

  return (
    <section id="promos" className="relative bg-[#fbfaf8] py-32 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-b from-neutral-200/20 to-transparent rounded-full blur-3xl" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                <Tag className="h-3 w-3" strokeWidth={2} />
                Ofertas Exclusivas
              </span>
              <h3 className="mt-6 text-4xl font-extrabold tracking-tight text-neutral-900 md:text-5xl">
                Descubre nuestras <br />
                <span className="text-neutral-300">Promociones Especiales</span>
              </h3>
            </div>
            <p className="max-w-md text-lg text-neutral-500 font-medium">
              Aprovecha nuestros beneficios exclusivos diseñados para el bienestar de tu mascota y tu tranquilidad.
            </p>
          </div>
        </Reveal>

        <div className="mt-20 grid gap-8 md:grid-cols-3">
          {displayPromos.map((promo, index) => {
            const badgeGradients: Record<string, string> = {
              spa: "from-amber-400 to-amber-200",
              salud: "from-blue-400 to-blue-200",
              shop: "from-emerald-400 to-emerald-200",
            };
            
            return (
              <Reveal key={index} delay={index * 120} y={28}>
                <div className={`group relative overflow-hidden rounded-[2.5rem] border border-neutral-200/60 bg-gradient-to-b ${promo.gradient} p-12 transition-all duration-500 hover:border-neutral-350 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] hover:-translate-y-1.5`}>
                  {/* Animated Top Line Glow */}
                  <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${badgeGradients[promo.badge] || "from-neutral-400 to-neutral-200"} rounded-t-[2.5rem] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />

                  {"discount" in promo && promo.discount > 0 && (
                    <div className="absolute top-8 right-8 flex items-center gap-1 rounded-full bg-black px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white">
                      <Tag className="h-3 w-3" />
                      -{promo.discount}%
                    </div>
                  )}
                  
                  <div className="relative">
                    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${badgeStyles[promo.badge] || "bg-neutral-100 text-neutral-600"}`}>
                      <Sparkles className="h-3 w-3" strokeWidth={2} />
                      {promo.badge === "spa" ? "Bienestar" : promo.badge === "salud" ? "Salud" : "Ahorro"}
                    </span>
                    
                    <h4 className="mt-6 text-2xl font-black tracking-tight text-neutral-900">
                      {promo.name}
                    </h4>
                    <p className="mt-4 text-base text-neutral-500 leading-relaxed">
                      {promo.description}
                    </p>

                    <div className="mt-8 flex justify-end">
                      <Link
                        href="/agendar-cita"
                        className="group/btn inline-flex items-center gap-2 rounded-full border-2 border-neutral-900 bg-transparent px-6 py-3 text-[10px] font-black uppercase tracking-widest text-neutral-900 transition-all duration-300 hover:bg-neutral-900 hover:text-white active:scale-95"
                      >
                        <span>Aprovechar ahora</span>
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" strokeWidth={2} />
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
