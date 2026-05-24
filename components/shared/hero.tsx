import Link from "next/link";
import { CalendarClock, ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black flex items-center">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover grayscale opacity-60 transition-opacity duration-1000"
        >
          <source
            src="https://res.cloudinary.com/dvlhicunu/video/upload/v1778468068/Luxury_Pet_Care_Scene_A_close-up_shot_reveals_a_man_with_short_brown_mJ6KUPdj_sn7iwe.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 w-full">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 reveal-section">
            <Sparkles className="h-3 w-3" strokeWidth={2} />
            Est. 2024 — Barranquilla
          </span>

          <h1 className="mt-8 text-5xl font-black tracking-tighter text-white md:text-8xl leading-[0.85] reveal-section" style={{ animationDelay: "0.1s", animationFillMode: "both" }}>
            Cuidado <br />
            <span className="text-neutral-400">Excepcional.</span>
          </h1>

          <p className="mt-8 max-w-md text-base md:text-lg leading-relaxed text-neutral-300 font-medium reveal-section" style={{ animationDelay: "0.2s", animationFillMode: "both" }}>
            Experiencia premium en bienestar animal. Un santuario dedicado a la salud y felicidad de tu mejor amigo.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-5 reveal-section" style={{ animationDelay: "0.3s", animationFillMode: "both" }}>
            <Link
              href="/agendar-cita"
              className="group relative inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-xs font-bold uppercase tracking-widest text-black transition-all duration-300 hover:bg-neutral-100 hover:scale-105 active:scale-95 shadow-lg shadow-white/10 hover:shadow-xl hover:shadow-white/20"
            >
              <CalendarClock className="h-4 w-4" strokeWidth={2} />
              Reservar Ahora
            </Link>

            <Link
              href="/petshop"
              className="group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white/80 transition-all duration-300 hover:text-white"
            >
              <span className="relative flex items-center gap-3">
                Explorar Tienda
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 transition-all duration-300 group-hover:border-white/50 group-hover:bg-white/10">
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2} />
                </span>
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 reveal-section" style={{ animationDelay: "0.8s", animationFillMode: "both" }}>
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">Descubre</span>
        <div className="h-10 w-[1px] bg-gradient-to-b from-white/50 to-transparent" />
      </div>
    </section>
  );
}
