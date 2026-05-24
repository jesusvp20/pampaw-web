import { ShoppingCart, Star } from "lucide-react";

type ProductCardProps = {
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
};

export default function ProductCard({
  name,
  description,
  price,
  imageUrl,
}: ProductCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-[2.5rem] border border-neutral-200/60 bg-white transition-all duration-500 hover:border-neutral-350 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] hover:-translate-y-1.5">
      {/* Animated Top Line Glow */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-neutral-900 to-neutral-700 rounded-t-[2.5rem] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

      <div className="aspect-square overflow-hidden bg-neutral-50 relative">
        {/* Floating Premium Glass Tag */}
        <div className="absolute top-6 left-6 z-10">
          <span className="rounded-full bg-white/80 backdrop-blur-md px-3 py-1.5 text-[8px] font-extrabold uppercase tracking-widest text-neutral-900 shadow-xs border border-neutral-250/20">
            Premium
          </span>
        </div>

        <img
          src={imageUrl || "/images/placeholder.jpg"}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/5" />
      </div>

      <div className="p-8">
        <h3 className="text-xl font-black tracking-tight text-neutral-900">
          {name}
        </h3>

        <p className="mt-3 text-sm font-medium leading-relaxed text-neutral-500 line-clamp-2">
          {description}
        </p>

        <div className="mt-6 flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" strokeWidth={1.5} />
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-neutral-100 pt-6">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Precio</span>
            <span className="text-lg font-black text-neutral-900">
              ${price.toLocaleString("es-CO")}
            </span>
          </div>

          <a 
            href={`https://wa.me/573000000000?text=Hola,%20quiero%20comprar%20el%20producto:%20${encodeURIComponent(name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn flex items-center gap-2 rounded-full border-2 border-neutral-900 bg-transparent px-6 py-3 text-[10px] font-black uppercase tracking-widest text-neutral-900 transition-all duration-300 hover:bg-neutral-900 hover:text-white active:scale-95"
          >
            <ShoppingCart className="h-4 w-4 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" strokeWidth={2} />
            Comprar
          </a>
        </div>
      </div>
    </div>
  );
}
