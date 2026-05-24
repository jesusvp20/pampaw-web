import Link from "next/link";
import { ArrowRight, Clock, Sparkles, Stethoscope, Hotel } from "lucide-react";

const categoryIcons: Record<string, React.ReactNode> = {
  Spa: <Sparkles className="h-4 w-4" strokeWidth={1.5} />,
  Veterinaria: <Stethoscope className="h-4 w-4" strokeWidth={1.5} />,
  Guardería: <Hotel className="h-4 w-4" strokeWidth={1.5} />,
};

const categoryColors: Record<string, string> = {
  Spa: "bg-amber-500/10 text-amber-800 border-amber-500/20",
  Veterinaria: "bg-blue-500/10 text-blue-800 border-blue-500/20",
  Guardería: "bg-emerald-500/10 text-emerald-800 border-emerald-500/20",
};

const categoryGradients: Record<string, string> = {
  Spa: "from-amber-400 to-amber-200",
  Veterinaria: "from-blue-400 to-blue-200",
  Guardería: "from-emerald-400 to-emerald-200",
};

type ServiceCardProps = {
  id: string;
  name: string;
  category: string;
  description: string | null;
  price: number;
};

export default function ServiceCard({
  id,
  name,
  category,
  description,
  price,
}: ServiceCardProps) {
  return (
    <Link
      href={`/agendar-cita/fecha?serviceId=${id}`}
      className="group relative block rounded-[2.5rem] border border-neutral-200/60 bg-white p-10 transition-all duration-500 hover:border-neutral-350 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 overflow-hidden"
    >
      {/* Animated Top Line Glow */}
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${categoryGradients[category] || "from-neutral-400 to-neutral-200"} rounded-t-[2.5rem] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />

      <div className="flex flex-col h-full">
        <div className="flex items-start justify-between">
          <div className="space-y-3.5">
            <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider ${categoryColors[category] || "bg-neutral-100 text-neutral-600"}`}>
              {categoryIcons[category] || null}
              {category}
            </span>
            <h3 className="text-2xl font-black tracking-tight text-neutral-900">
              {name}
            </h3>
          </div>
          <div className="shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-neutral-50 text-neutral-400 transition-all duration-300 group-hover:bg-neutral-900 group-hover:text-white group-hover:scale-110">
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2.5} />
          </div>
        </div>

        <p className="mt-5 text-base text-neutral-500 leading-relaxed grow">
          {description}
        </p>

        <div className="mt-8 flex items-center justify-between border-t border-neutral-100 pt-6">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Desde</span>
            <span className="text-xl font-black text-neutral-900">
              ${price.toLocaleString("es-CO")}
            </span>
          </div>

          <span className="rounded-full border-2 border-neutral-900 bg-transparent px-7 py-3 text-[10px] font-black uppercase tracking-widest text-neutral-900 transition-all duration-350 group-hover:bg-neutral-900 group-hover:text-white active:scale-95">
            Reservar
          </span>
        </div>
      </div>
    </Link>
  );
}
