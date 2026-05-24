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
    <div className="group overflow-hidden rounded-[2rem] border border-neutral-100 bg-white transition-all duration-300 hover:border-neutral-300 hover:shadow-lg hover:-translate-y-1">
      <div className="aspect-square overflow-hidden bg-neutral-50 relative">
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
            className="flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-neutral-800 hover:shadow-lg active:scale-95"
          >
            <ShoppingCart className="h-4 w-4" strokeWidth={2} />
            Comprar
          </a>
        </div>
      </div>
    </div>
  );
}
