"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createAppointment } from "@/actions/appointments/create-appointment";
import { Loader2 } from "lucide-react";

type ConfirmarReservaProps = {
  serviceId: string;
  appointmentDate: string;
};

export default function ConfirmarReserva({ serviceId, appointmentDate }: ConfirmarReservaProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    ownerName: "",
    phone: "",
    petName: "",
  });
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem("pampaw_booking");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setFormData(data);
        setHasData(true);
      } catch {}
    }
  }, []);

  const handleConfirm = async () => {
    if (!formData.ownerName || !formData.phone || !formData.petName) return;
    setSubmitting(true);

    const fd = new FormData();
    fd.set("ownerName", formData.ownerName);
    fd.set("phone", formData.phone);
    fd.set("petName", formData.petName);
    fd.set("serviceId", serviceId);
    fd.set("appointment", appointmentDate);

    localStorage.setItem("pampaw_profile", JSON.stringify({
      name: formData.ownerName,
      phone: formData.phone,
    }));

    sessionStorage.removeItem("pampaw_booking");

    await createAppointment(fd);
  };

  if (!hasData) {
    return (
      <div className="text-center py-8">
        <p className="text-sm text-neutral-400 font-medium">
          No se encontraron los datos de la reserva.
        </p>
        <button
          onClick={() => router.push(`/agendar-cita/datos?serviceId=${serviceId}&date=${appointmentDate}`)}
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-[10px] font-black uppercase tracking-wider text-white transition-all hover:bg-neutral-800 active:scale-[0.97]"
        >
          Volver a Datos
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="rounded-xl bg-neutral-50 border border-neutral-100 p-5 space-y-4">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 text-center">
          Tus Datos
        </h3>

        <div className="grid gap-4">
          <div className="flex items-center justify-between rounded-xl bg-white px-5 py-4 border border-neutral-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Nombre</span>
            <span className="text-sm font-black text-neutral-900">{formData.ownerName}</span>
          </div>
          <div className="flex items-center justify-between rounded-xl bg-white px-5 py-4 border border-neutral-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Teléfono</span>
            <span className="text-sm font-black text-neutral-900">{formData.phone}</span>
          </div>
          <div className="flex items-center justify-between rounded-xl bg-white px-5 py-4 border border-neutral-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Mascota</span>
            <span className="text-sm font-black text-neutral-900">{formData.petName}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={handleConfirm}
          disabled={submitting}
          className="w-full rounded-full bg-neutral-900 px-8 py-4 text-[10px] font-black uppercase tracking-[0.35em] text-white transition-all duration-300 hover:bg-neutral-800 hover:shadow-lg active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
              Confirmando...
            </>
          ) : (
            "Confirmar Reserva"
          )}
        </button>

        <button
          onClick={() => router.push(`/agendar-cita/datos?serviceId=${serviceId}&date=${appointmentDate}`)}
          disabled={submitting}
          className="w-full rounded-full border border-neutral-200 px-8 py-4 text-[10px] font-black uppercase tracking-[0.35em] text-neutral-500 transition-all duration-300 hover:border-neutral-400 hover:text-neutral-900 active:scale-[0.97] disabled:opacity-40"
        >
          Editar Datos
        </button>
      </div>
    </div>
  );
}
