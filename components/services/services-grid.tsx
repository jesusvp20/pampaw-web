import ServiceCard from "./service-card";
import Reveal from "@/components/shared/reveal";

type Service = {
  id: string;
  name: string;
  category: string;
  description: string | null;
  price: number;
};

type ServicesGridProps = {
  services: Service[];
};

export default function ServicesGrid({
  services,
}: ServicesGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {services.map((service, i) => (
        <Reveal key={service.id} delay={i * 120} y={32}>
          <ServiceCard
            id={service.id}
            name={service.name}
            category={service.category}
            description={service.description}
            price={service.price}
          />
        </Reveal>
      ))}
    </div>
  );
}