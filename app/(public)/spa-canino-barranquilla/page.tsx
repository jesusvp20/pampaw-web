import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Spa Canino en Barranquilla | Pampaw Pet Store",
  description:
    "Servicio profesional de spa canino en Barranquilla. Baño, grooming, corte y cuidado premium para mascotas.",
};

export default async function SpaCaninoPage() {
  const services = await prisma.service.findMany();

  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="bg-[#f8f6f2] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm">
              Spa Canino en Barranquilla
            </span>

            <h1 className="mt-6 text-4xl md:text-5xl font-black tracking-tight text-neutral-900 leading-[1.1]">
              Cuidado premium para tu mascota.
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-neutral-600">
              En Pampaw ofrecemos servicios profesionales de baño, grooming,
              limpieza y cuidado estético para mascotas en Barranquilla.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.id}
                className="rounded-3xl border border-neutral-200 p-8"
              >
                <h2 className="text-2xl font-semibold text-neutral-900">
                  {service.name}
                </h2>

                <p className="mt-4 leading-relaxed text-neutral-600">
                  {service.description}
                </p>

                <div className="mt-6 text-lg font-bold text-neutral-900">
                  ${service.price.toLocaleString("es-CO")}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}