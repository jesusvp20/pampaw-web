import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-[#fbfaf8]">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-4">
        {/* Brand */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-6 group">
            <img 
              src="/images/logo-no-bg.png" 
              alt="Pampaw Logo" 
              className="h-24 w-auto transition-transform duration-500 group-hover:scale-105"
            />
            <div className="flex flex-col">
              <h2 className="text-3xl font-black tracking-tighter text-neutral-900 leading-none">PAMPAW</h2>
              <span className="text-[12px] font-bold uppercase tracking-[0.3em] text-neutral-400 mt-2">Pet Store & Spa</span>
            </div>
          </div>

          <p className="mt-6 text-sm leading-relaxed text-neutral-500 max-w-xs">
            Experiencia premium en bienestar animal. Spa canino, veterinaria y tienda especializada en el corazón de Barranquilla.
          </p>
          
          <div className="mt-6 flex gap-4">
            <a href="https://instagram.com/pampaw_co" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center h-10 w-10 rounded-full bg-neutral-100 text-neutral-400 hover:bg-neutral-900 hover:text-white transition-all duration-300" aria-label="Instagram">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-900">
            Navegación
          </h3>

          <ul className="mt-6 space-y-4 text-[13px] font-medium text-neutral-500">
            <li><a href="/" className="hover:text-black transition-colors">Inicio</a></li>
            <li><a href="#servicios" className="hover:text-black transition-colors">Servicios</a></li>
            <li><a href="/petshop" className="hover:text-black transition-colors">Petshop</a></li>
            <li><a href="#promos" className="hover:text-black transition-colors">Promociones</a></li>
            <li><a href="#galeria" className="hover:text-black transition-colors">Galería</a></li>
          </ul>
        </div>

        {/* Hours */}
        <div>
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-900">
            Horarios
          </h3>

          <ul className="mt-6 space-y-4 text-[13px] font-medium text-neutral-500">
            <li>
              <span className="block text-neutral-900 font-bold uppercase text-[9px] tracking-wider">Lunes a Sábado</span>
              8:00 AM — 7:00 PM
            </li>
            <li>
              <span className="block text-neutral-900 font-bold uppercase text-[9px] tracking-wider">Domingos y Festivos</span>
              Cerrado
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-900">
            Contacto
          </h3>

          <ul className="mt-6 space-y-5 text-[13px] font-medium text-neutral-500">
            <li className="flex items-start gap-3">
              <MapPin className="h-4 w-4 text-neutral-400 mt-0.5 shrink-0" strokeWidth={1.5} />
              Barranquilla, Colombia
            </li>
            <li className="flex items-start gap-3">
              <Phone className="h-4 w-4 text-neutral-400 mt-0.5 shrink-0" strokeWidth={1.5} />
              +57 300 000 0000
            </li>
            <li className="flex items-start gap-3">
              <Mail className="h-4 w-4 text-neutral-400 mt-0.5 shrink-0" strokeWidth={1.5} />
              contacto@pampaw.com
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-neutral-200 py-8">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] font-medium text-neutral-400">
            &copy; {new Date().getFullYear()} Pampaw Pet Store. Todos los derechos reservados.
          </p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-300">
            Premium Pet Care
          </p>
        </div>
      </div>
    </footer>
  );
}
