import Hero from "@/components/shared/hero";
import ServicesSection from "@/components/services/services-section";
import Benefits from "@/components/shared/benefits";
import Gallery from "@/components/shared/gallery";
import ProductsSection from "@/components/shop/products-section";
import PromotionsSection from "@/components/shared/promotions-section";

import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Pampaw | Experiencia Premium para Mascotas en Barranquilla",
  description:
    "El mejor spa canino, veterinaria y petshop de Barranquilla. Cuidado excepcional y productos de alta gama.",
};

export default async function HomePage() {
  const services = await Promise.all([
    prisma.service.findFirst({ where: { category: "Spa" } }),
    prisma.service.findFirst({ where: { category: "Veterinaria" } }),
    prisma.service.findFirst({ where: { category: "Guardería" } }),
  ]).then(res => res.filter(Boolean) as any[]);

  const products = await prisma.product.findMany({
    take: 3,
  });
  const promotions = await prisma.promotion.findMany({
    take: 3,
  });

  return (
    <main className="overflow-hidden">
      <Hero />
      
      <div id="servicios" className="scroll-mt-32">
        <ServicesSection services={services} />
      </div>

      <div id="promos" className="scroll-mt-32">
        <PromotionsSection promotions={promotions} />
      </div>
      
      <div>
        <Benefits />
      </div>

      <div id="galeria">
        <Gallery />
      </div>

      <div id="petshop" className="scroll-mt-32">
        <ProductsSection products={products} />
      </div>
    </main>
  );
}
