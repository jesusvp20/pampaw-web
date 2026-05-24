"use client";

import { useEffect, useRef, useState } from "react";
import { Heart, Sparkles, Shield, Star, Camera } from "lucide-react";

const images: {
  url: string;
  alt: string;
  title: string;
  subtitle: string;
  size: "small" | "medium" | "large";
}[] = [
  {
    url: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=80",
    alt: "Perro siendo bañado en spa",
    title: "Hidroterapia",
    subtitle: "Relajación total",
    size: "large",
  },
  {
    url: "https://images.unsplash.com/photo-1544568100-847a948585b9?w=800&q=80",
    alt: "Perro feliz",
    title: "Felicidad Canina",
    subtitle: "Bienestar emocional",
    size: "small",
  },
  {
    url: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&q=80",
    alt: "Perro con accesorios",
    title: "Estilo Premium",
    subtitle: "Accesorios de lujo",
    size: "small",
  },
  {
    url: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&q=80",
    alt: "Perro en veterinaria",
    title: "Chequeo VIP",
    subtitle: "Salud garantizada",
    size: "medium",
  },
  {
    url: "https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?w=800&q=80",
    alt: "Perro siendo cepillado",
    title: "Grooming Elite",
    subtitle: "Estética canina",
    size: "medium",
  },
  {
    url: "https://images.unsplash.com/photo-1530041539828-114de669390e?w=800&q=80",
    alt: "Cachorro durmiendo",
    title: "Sueño Reparador",
    subtitle: "Descanso premium",
    size: "small",
  },
  {
    url: "https://images.unsplash.com/photo-1612532275214-e0e2bbf88eeb?w=800&q=80",
    alt: "Perro en sala de espera",
    title: "Instalaciones",
    subtitle: "Ambiente acogedor",
    size: "small",
  },
];

const stats = [
  { icon: Heart, value: "500+", label: "Mascotas felices" },
  { icon: Sparkles, value: "4.9", label: "Calificación" },
  { icon: Shield, value: "8+", label: "Años de expertise" },
  { icon: Star, value: "100%", label: "Recomendación" },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
}

function GalleryItem({
  image,
  index,
}: {
  image: (typeof images)[0];
  index: number;
}) {
  const [ref, inView] = useInView(0.1);

  const sizeClasses = {
    small: "col-span-1 row-span-1",
    medium: "col-span-1 row-span-2",
    large: "col-span-2 row-span-2",
  };

  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden rounded-3xl ${sizeClasses[image.size]} transition-all duration-700 ease-out ${
        inView
          ? "translate-y-0 opacity-100"
          : "translate-y-8 opacity-0"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="absolute inset-0">
        <img
          src={image.url}
          alt={image.alt}
          className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
          loading="lazy"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-95" />

      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <div className="transform transition-all duration-500 translate-y-4 group-hover:translate-y-0">
          <h3 className="text-lg md:text-2xl font-black tracking-tight text-white">
            {image.title}
          </h3>
          <p className="mt-1 text-xs md:text-sm font-medium text-white/70 tracking-wide">
            {image.subtitle}
          </p>
        </div>
      </div>

      <div className="absolute top-4 right-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
          <Camera className="h-4 w-4 text-white" strokeWidth={2} />
        </span>
      </div>
    </div>
  );
}

export default function Gallery() {
  const [sectionRef, sectionInView] = useInView(0.05);

  return (
    <section id="galeria" className="relative bg-[#fbfaf8] py-32 md:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#f0e6d3_0%,transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div
          ref={sectionRef}
          className={`flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-neutral-200 pb-12 transition-all duration-700 ${
            sectionInView
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500">
              <Camera className="h-3 w-3" strokeWidth={2} />
              Galería Pampaw
            </span>
            <h2 className="mt-6 text-4xl font-black tracking-tighter text-neutral-900 md:text-6xl leading-[0.9]">
              Momentos que <br />
              <span className="text-neutral-300">Inspiran.</span>
            </h2>
          </div>
          <p className="max-w-md text-base md:text-lg font-medium leading-relaxed text-neutral-500">
            Cada visita es una historia. Conoce el cuidado excepcional que
            brindamos a través de las experiencias de nuestros clientes.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[280px]">
          {images.map((image, i) => (
            <GalleryItem key={i} image={image} index={i} />
          ))}
        </div>

        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`flex flex-col items-center gap-3 rounded-2xl border border-neutral-200 bg-white px-6 py-8 transition-all duration-700 ${
                  sectionInView
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${400 + i * 100}ms` }}
              >
                <Icon className="h-5 w-5 text-neutral-400" strokeWidth={1.5} />
                <span className="text-3xl md:text-4xl font-black tracking-tight text-neutral-900">
                  {stat.value}
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                  {stat.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
