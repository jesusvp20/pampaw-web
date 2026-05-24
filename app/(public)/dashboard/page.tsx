"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarClock, Plus, PawPrint, Trash2, Calendar, ChevronRight, LogOut, X } from "lucide-react";
import { deleteAppointment } from "@/actions/appointments/delete-appointment";

type Appointment = {
  id: string;
  serviceName: string;
  petName: string;
  date: string;
  status: string;
};

type Pet = {
  id: string;
  name: string;
};

export default function DashboardClientPage() {
  const [profile, setProfile] = useState<{ name: string; phone: string } | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [pets, setPets] = useState<Pet[]>([]);
  const [newPetName, setNewPetName] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("pampaw_profile");
    if (!saved) {
      setLoading(false);
      return;
    }

    const profileData = JSON.parse(saved);
    setProfile(profileData);

    const savedPets = localStorage.getItem("pampaw_pets");
    if (savedPets) {
      try { setPets(JSON.parse(savedPets)); } catch {}
    }

    fetch(`/api/appointments?phone=${encodeURIComponent(profileData.phone)}`)
      .then(r => r.json())
      .then(data => setAppointments(data))
      .catch(() => setAppointments([]))
      .finally(() => setLoading(false));
  }, []);

  const addPet = () => {
    const name = newPetName.trim();
    if (!name) return;
    const newPet: Pet = { id: Date.now().toString(), name };
    const updated = [...pets, newPet];
    setPets(updated);
    localStorage.setItem("pampaw_pets", JSON.stringify(updated));
    setNewPetName("");
  };

  const removePet = (id: string) => {
    const updated = pets.filter(p => p.id !== id);
    setPets(updated);
    localStorage.setItem("pampaw_pets", JSON.stringify(updated));
  };

  const handleDeleteAppointment = async (id: string) => {
    setDeleting(id);
    await deleteAppointment(id);
    setAppointments(prev => prev.filter(a => a.id !== id));
    setDeleting(null);
  };

  const logout = () => {
    localStorage.removeItem("pampaw_profile");
    localStorage.removeItem("pampaw_pets");
    setProfile(null);
    setPets([]);
    setAppointments([]);
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("es-CO", { weekday: "long", day: "numeric", month: "long" });
  };

  const formatTime = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" });
  };

  if (!profile) {
    return (
      <main className="min-h-screen bg-[#fbfaf8] flex items-center justify-center px-6">
        <div className="max-w-sm text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-100">
            <PawPrint className="h-7 w-7 text-neutral-400" strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-neutral-900">
            No has agendado <br />
            <span className="text-neutral-300">una cita aún</span>
          </h1>
          <p className="mt-3 text-sm text-neutral-500 font-medium">
            Agenda tu primera cita y podrás verla aquí, además de gestionar tus mascotas.
          </p>
          <Link
            href="/agendar-cita"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-neutral-900 px-8 py-4 text-[10px] font-black uppercase tracking-[0.3em] text-white transition-all hover:bg-neutral-800 active:scale-[0.97]"
          >
            <CalendarClock className="h-4 w-4" strokeWidth={2} />
            Agendar Cita
          </Link>
        </div>
      </main>
    );
  }

  const upcoming = appointments.filter(a => new Date(a.date) > new Date());
  const past = appointments.filter(a => new Date(a.date) <= new Date());

  return (
    <main className="min-h-screen bg-[#fbfaf8] pb-24">
      <div className="mx-auto max-w-2xl px-6 pt-28">
        {/* Header */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-neutral-900 text-white text-sm font-black">
                {profile.name.charAt(0).toUpperCase()}
              </span>
              <div>
                <h1 className="text-xl font-black tracking-tight text-neutral-900">
                  {profile.name}
                </h1>
                <p className="text-sm text-neutral-400 font-medium">{profile.phone}</p>
              </div>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 rounded-full border border-neutral-200 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-neutral-400 transition-all hover:border-neutral-400 hover:text-neutral-700"
          >
            <LogOut className="h-3.5 w-3.5" strokeWidth={2} />
            Salir
          </button>
        </div>

        <div className="space-y-10">
          {/* Mis Mascotas */}
          <section>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-neutral-900 flex items-center gap-2">
                <PawPrint className="h-4 w-4" strokeWidth={2} />
                Mis Mascotas
              </h2>
            </div>

            <div className="rounded-2xl border border-neutral-200/60 bg-white p-6 shadow-sm">
              {pets.length > 0 ? (
                <div className="grid gap-3 mb-5">
                  {pets.map(pet => (
                    <div
                      key={pet.id}
                      className="flex items-center justify-between rounded-xl border border-neutral-100 bg-neutral-50/50 px-5 py-4"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-200 text-neutral-600">
                          <PawPrint className="h-4 w-4" strokeWidth={2} />
                        </span>
                        <span className="text-sm font-bold text-neutral-900">{pet.name}</span>
                      </div>
                      <button
                        onClick={() => removePet(pet.id)}
                        className="text-neutral-400 hover:text-red-500 transition-colors p-2 -m-2"
                        aria-label={`Eliminar ${pet.name}`}
                      >
                        <Trash2 className="h-4 w-4" strokeWidth={2} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-neutral-400 mb-5 text-center py-4">
                  Aún no has registrado mascotas
                </p>
              )}

              <div className="flex gap-3">
                <input
                  type="text"
                  value={newPetName}
                  onChange={e => setNewPetName(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && addPet()}
                  placeholder="Nombre de la mascota"
                  className="flex-1 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none transition-all focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900/10"
                />
                <button
                  onClick={addPet}
                  disabled={!newPetName.trim()}
                  className="flex items-center gap-2 rounded-xl bg-neutral-900 px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-white transition-all hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.97]"
                >
                  <Plus className="h-4 w-4" strokeWidth={2} />
                  Añadir
                </button>
              </div>
            </div>
          </section>

          {/* Próximas Citas */}
          <section>
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-neutral-900 flex items-center gap-2 mb-5">
              <Calendar className="h-4 w-4" strokeWidth={2} />
              Próximas Citas
            </h2>

            {loading ? (
              <div className="rounded-2xl border border-neutral-200/60 bg-white p-10 text-center">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-900 mx-auto" />
              </div>
            ) : upcoming.length > 0 ? (
              <div className="grid gap-4">
                {upcoming.map(app => (
                  <Link
                    key={app.id}
                    href={`/dashboard?id=${app.id}`}
                    className="group flex items-center justify-between rounded-2xl border border-neutral-200/60 bg-white p-5 transition-all hover:border-neutral-300 hover:shadow-md"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-center justify-center h-14 w-14 rounded-xl bg-neutral-100 text-neutral-600">
                        <span className="text-lg font-black leading-none text-neutral-900">
                          {new Date(app.date).getDate()}
                        </span>
                        <span className="text-[8px] font-bold uppercase tracking-wider text-neutral-400 mt-0.5">
                          {new Date(app.date).toLocaleDateString("es-CO", { month: "short" })}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-neutral-900">{app.serviceName}</p>
                        <p className="text-xs text-neutral-500 mt-0.5">
                          {app.petName} — {formatTime(app.date)}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-neutral-300 transition-colors group-hover:text-neutral-600" strokeWidth={2} />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-neutral-200/60 bg-white p-10 text-center">
                <p className="text-sm text-neutral-400 font-medium">No tienes citas próximas</p>
                <Link
                  href="/agendar-cita"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-white transition-all hover:bg-neutral-800 active:scale-[0.97]"
                >
                  <CalendarClock className="h-3.5 w-3.5" strokeWidth={2} />
                  Agendar ahora
                </Link>
              </div>
            )}
          </section>

          {/* Historial */}
          {past.length > 0 && (
            <section>
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-neutral-500 flex items-center gap-2 mb-5">
                Historial
              </h2>
              <div className="grid gap-3">
                {past.map(app => (
                  <div
                    key={app.id}
                    className="flex items-center justify-between rounded-2xl border border-neutral-100 bg-white/60 p-4"
                  >
                    <div>
                      <p className="text-sm font-bold text-neutral-700">{app.serviceName}</p>
                      <p className="text-xs text-neutral-400 mt-0.5">
                        {formatDate(app.date)} — {app.petName}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-neutral-100 px-3 py-1 text-[8px] font-bold uppercase tracking-wider text-neutral-400">
                        Completada
                      </span>
                      <button
                        onClick={() => handleDeleteAppointment(app.id)}
                        disabled={deleting === app.id}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 text-neutral-400 transition-all hover:border-red-300 hover:bg-red-50 hover:text-red-500 disabled:opacity-40"
                        aria-label={`Eliminar cita de ${app.petName}`}
                      >
                        <X className="h-3.5 w-3.5" strokeWidth={2} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
