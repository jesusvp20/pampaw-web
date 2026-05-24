import Link from "next/link";
import { ArrowRight, Clock, Sparkles, Stethoscope, Hotel } from "lucide-react";

const categoryIcons: Record<string, React.ReactNode> = {
  Spa: <Sparkles className="h-5 w-5" strokeWidth={1.5} />,
  Veterinaria: <Stethoscope className="h-5 w-5" strokeWidth={1.5} />,
  Guardería: <Hotel className="h-5 w-5" strokeWidth={1.5} />,
};

const categoryColors: Record<string, string> = {
  Spa: "bg-amber-50 text-amber-700 border-amber-200",
  Veterinaria: "bg-blue-50 text-blue-700 border-blue-200",
  Guardería: "bg-emerald-50 text-emerald-700 border-emerald-200",
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
      className="group relative block rounded-[2rem] border border-neutral-100 bg-white p-10 transition-all duration-300 hover:border-neutral-300 hover:shadow-lg hover:-translate-y-1"
    >
      <div className="flex flex-col h-full">
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${categoryColors[category] || "bg-neutral-100 text-neutral-600"}`}>
              {categoryIcons[category] || null}
              {category}
            </span>
            <h3 className="text-2xl font-black tracking-tight text-neutral-900">
              {name}
            </h3>
          </div>
          <div className="shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-neutral-50 text-neutral-400 transition-all duration-300 group-hover:bg-neutral-900 group-hover:text-white group-hover:scale-110">
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
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

          <span className="rounded-full bg-neutral-900 px-7 py-4 text-[10px] font-bold uppercase tracking-widest text-white transition-all duration-300 group-hover:bg-neutral-800 group-hover:shadow-lg active:scale-95">
            Reservar
          </span>
        </div>
      </div>
    </Link>
  );
}
