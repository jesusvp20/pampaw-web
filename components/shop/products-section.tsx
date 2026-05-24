import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";
import ProductCard from "./product-card";
import Reveal from "@/components/shared/reveal";

type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
};

type ProductsSectionProps = {
  products: Product[];
};

export default function ProductsSection({
  products,
}: ProductsSectionProps) {
  return (
    <section id="petshop" className="relative bg-white py-32 overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-t from-neutral-100/30 to-transparent rounded-full blur-3xl" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-100 pb-12">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                <ShoppingBag className="h-3 w-3" strokeWidth={2} />
                Pampaw Shop
              </span>
              <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-neutral-900 md:text-5xl">
                Esenciales <br />
                <span className="text-neutral-300">Para tu Mascota.</span>
              </h2>
            </div>
            <Link
              href="/petshop"
              className="group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-neutral-900 transition-all duration-300 hover:text-neutral-600"
            >
              Ver catálogo completo
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 transition-all duration-300 group-hover:border-neutral-900 group-hover:bg-neutral-900 group-hover:text-white">
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </span>
            </Link>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {products.map((product, i) => (
            <Reveal key={product.id} delay={i * 120} y={28}>
              <ProductCard
                name={product.name}
                description={product.description}
                price={product.price}
                imageUrl={product.imageUrl}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
