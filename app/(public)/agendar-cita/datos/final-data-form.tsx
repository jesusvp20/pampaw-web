"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import GoogleAuthButton from "@/components/appointments/google-auth-button";

type FinalDataFormProps = {
  serviceId: string;
  appointmentDate: string;
};

export default function FinalDataForm({ serviceId, appointmentDate }: FinalDataFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    ownerName: "",
    phone: "",
    petName: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("pampaw_profile");
    if (saved) {
      try {
        const profile = JSON.parse(saved);
        setFormData(prev => ({
          ...prev,
          ownerName: profile.name || prev.ownerName,
          phone: profile.phone || prev.phone,
        }));
      } catch {}
    }
  }, []);

  useEffect(() => {
    const handleGoogleSuccess = (e: any) => {
      const { name } = e.detail;
      setFormData(prev => ({
        ...prev,
        ownerName: name || prev.ownerName
      }));
    };

    window.addEventListener('google-login-success', handleGoogleSuccess);
    return () => window.removeEventListener('google-login-success', handleGoogleSuccess);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sessionStorage.setItem("pampaw_booking", JSON.stringify({
      ownerName: formData.ownerName,
      phone: formData.phone,
      petName: formData.petName,
    }));
    router.push(`/agendar-cita/confirmar?serviceId=${serviceId}&date=${appointmentDate}`);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-neutral-50 border border-neutral-100 p-5 space-y-4">
        <p className="text-center text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">
          Llena más rápido con Google
        </p>
        <GoogleAuthButton />
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-neutral-50 px-3 text-[9px] font-black uppercase tracking-[0.2em] text-neutral-400">O manualmente</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-5">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">Tu Nombre</label>
            <input
              type="text"
              name="ownerName"
              value={formData.ownerName}
              onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
              required
              placeholder="Ej: Juan Pérez"
              className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3.5 text-sm outline-none transition-all focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900/10"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">Teléfono</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              placeholder="Ej: 3001234567"
              className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3.5 text-sm outline-none transition-all focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900/10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">Nombre de la Mascota</label>
          <input
            type="text"
            name="petName"
            value={formData.petName}
            onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
            required
            placeholder="Ej: Max"
            className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3.5 text-sm outline-none transition-all focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900/10"
          />
        </div>

        <button
          type="submit"
          className="mt-4 w-full rounded-full bg-neutral-900 px-8 py-4 text-[10px] font-black uppercase tracking-[0.35em] text-white transition-all duration-300 hover:bg-neutral-800 hover:shadow-lg active:scale-[0.97]"
        >
          Revisar Reserva →
        </button>
      </form>
    </div>
  );
}
