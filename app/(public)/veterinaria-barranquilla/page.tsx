export const metadata = {
  title: "Veterinaria en Barranquilla | Pampaw Pet Store",
  description:
    "Veterinaria en Barranquilla con atención profesional para mascotas. Consultas, cuidado y bienestar animal.",
};

export default function VeterinariaPage() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="bg-[#f8f6f2] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm">
              Veterinaria en Barranquilla
            </span>

            <h1 className="mt-6 text-4xl md:text-5xl font-black tracking-tight text-neutral-900 leading-[1.1]">
              Atención veterinaria profesional para tu mascota.
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-neutral-600">
              En Pampaw brindamos atención veterinaria enfocada en el bienestar,
              salud y cuidado integral de cada mascota.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-3">
          <div className="rounded-3xl border border-neutral-200 p-8">
            <h2 className="text-2xl font-semibold text-neutral-900">
              Consultas
            </h2>

            <p className="mt-4 leading-relaxed text-neutral-600">
              Atención profesional para evaluar la salud y bienestar de tu
              mascota.
            </p>
          </div>

          <div className="rounded-3xl border border-neutral-200 p-8">
            <h2 className="text-2xl font-semibold text-neutral-900">
              Vacunación
            </h2>

            <p className="mt-4 leading-relaxed text-neutral-600">
              Protección y prevención para mantener a tu mascota saludable.
            </p>
          </div>

          <div className="rounded-3xl border border-neutral-200 p-8">
            <h2 className="text-2xl font-semibold text-neutral-900">
              Cuidado Integral
            </h2>

            <p className="mt-4 leading-relaxed text-neutral-600">
              Seguimiento y orientación para el bienestar completo de tu
              mascota.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}