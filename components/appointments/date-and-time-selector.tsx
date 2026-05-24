"use client";

import { useState, useMemo, useRef, useEffect } from "react";

type AppointmentInfo = {
  id: string;
  appointment: string; // ISO String
  service: {
    id: string;
    name: string;
    duration: number;
  };
};

type DateAndTimeSelectorProps = {
  serviceId: string;
  serviceName: string;
  serviceDuration: number; // in minutes
  existingAppointments: AppointmentInfo[];
};

export default function DateAndTimeSelector({
  serviceId,
  serviceName,
  serviceDuration,
  existingAppointments,
}: DateAndTimeSelectorProps) {
  // Generate 30 days starting from today
  const days = useMemo(() => {
    const arr = [];
    const now = new Date();
    for (let i = 0; i < 30; i++) {
      const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
      arr.push(d);
    }
    return arr;
  }, []);

  const [selectedDate, setSelectedDate] = useState<Date>(days[0]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [timeFilter, setTimeFilter] = useState<"morning" | "afternoon">(
    new Date().getHours() >= 12 ? "afternoon" : "morning"
  );

  const sliderRef = useRef<HTMLDivElement>(null);

  // Business Hours: 8:00 AM to 8:00 PM (20:00)
  const businessStartHour = 8;
  const businessEndHour = 20;

  // Generate slots in 30-minute intervals
  const slots = useMemo(() => {
    const list = [];
    for (let hour = businessStartHour; hour < businessEndHour; hour++) {
      list.push(`${hour.toString().padStart(2, "0")}:00`);
      list.push(`${hour.toString().padStart(2, "0")}:30`);
    }
    return list;
  }, []);

  // Compute status for each slot of the selected day
  const analyzedSlots = useMemo(() => {
    const now = new Date();
    
    return slots.map((slot) => {
      const [hourStr, minStr] = slot.split(":");
      const slotHour = parseInt(hourStr);
      const slotMin = parseInt(minStr);

      // Create Date object for this slot on the selected day
      const slotDate = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        slotHour,
        slotMin,
        0,
        0
      );

      const slotTimeMs = slotDate.getTime();
      const slotDurationMs = serviceDuration * 60 * 1000;
      const slotEndTimeMs = slotTimeMs + slotDurationMs;

      // 1. Check if the slot starts in the past (only relevant if selectedDate is today)
      const isPast = slotTimeMs < now.getTime();

      // 2. Check if the service exceeds closing time (8:00 PM / 20:00)
      const closingTime = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        businessEndHour,
        0,
        0,
        0
      );
      const exceedsClosing = slotEndTimeMs > closingTime.getTime();

      // 3. Check for overlap (double booking) with existing appointments
      let isOverlapping = false;
      let overlappingService = "";

      for (const app of existingAppointments) {
        const appStartMs = new Date(app.appointment).getTime();
        const appDurationMs = app.service.duration * 60 * 1000;
        const appEndMs = appStartMs + appDurationMs;

        // Overlap condition: slotStart < appEnd && slotEnd > appStart
        if (slotTimeMs < appEndMs && slotEndTimeMs > appStartMs) {
          isOverlapping = true;
          overlappingService = app.service.name;
          break;
        }
      }

      const isAvailable = !isPast && !exceedsClosing && !isOverlapping;

      return {
        time: slot,
        isAvailable,
        isPast,
        exceedsClosing,
        isOverlapping,
        overlappingService,
      };
    });
  }, [selectedDate, slots, serviceDuration, existingAppointments]);

  // Automatically switch filter if current filter has no slots (e.g. today past morning)
  useEffect(() => {
    const morningAvailable = analyzedSlots.some(
      (s) => s.isAvailable && parseInt(s.time.split(":")[0]) < 12
    );
    const afternoonAvailable = analyzedSlots.some(
      (s) => s.isAvailable && parseInt(s.time.split(":")[0]) >= 12
    );

    if (timeFilter === "morning" && !morningAvailable && afternoonAvailable) {
      setTimeFilter("afternoon");
    } else if (timeFilter === "afternoon" && !afternoonAvailable && morningAvailable) {
      setTimeFilter("morning");
    }
  }, [selectedDate, analyzedSlots]);

  // Format Month & Year for Header
  const monthYearHeader = useMemo(() => {
    const months = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    return `${months[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`;
  }, [selectedDate]);

  // Date abbreviations
  const getWeekdayAbbrev = (date: Date) => {
    const daysName = ["DO", "LU", "MA", "MI", "JU", "VI", "SA"];
    return daysName[date.getDay()];
  };

  // Scroll day slider
  const handleScroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = 300;
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Convert selected date & slot to ISO String for form submission
  const selectedDateTimeISO = useMemo(() => {
    if (!selectedSlot) return "";
    const [hourStr, minStr] = selectedSlot.split(":");
    const d = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      parseInt(hourStr),
      parseInt(minStr),
      0,
      0
    );
    return d.toISOString();
  }, [selectedDate, selectedSlot]);

  // Filter slots for rendering based on Morning/Afternoon selection
  const filteredSlots = useMemo(() => {
    return analyzedSlots.filter((slot) => {
      const hour = parseInt(slot.time.split(":")[0]);
      if (timeFilter === "morning") {
        return hour < 12;
      } else {
        return hour >= 12;
      }
    });
  }, [analyzedSlots, timeFilter]);

  return (
    <div className="space-y-6">

      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-neutral-900">
            ¿Cuándo?
          </h3>

          <div className="flex items-center gap-3 bg-neutral-50 rounded-full border border-neutral-100">
            <button
              type="button"
              onClick={() => handleScroll("left")}
              className="text-neutral-500 hover:text-black transition-colors p-3"
              aria-label="Días anteriores"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-800 min-w-[80px] sm:min-w-[100px] text-center select-none">
              {monthYearHeader}
            </span>
            <button
              type="button"
              onClick={() => handleScroll("right")}
              className="text-neutral-500 hover:text-black transition-colors p-3"
              aria-label="Siguientes días"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="relative">
          <div
            ref={sliderRef}
            className="flex gap-2 overflow-x-auto hide-scrollbar pb-1 px-0.5 snap-x scroll-smooth"
          >
            {days.map((date, idx) => {
              const isSelected =
                date.getDate() === selectedDate.getDate() &&
                date.getMonth() === selectedDate.getMonth() &&
                date.getFullYear() === selectedDate.getFullYear();

              const dayLabel = getWeekdayAbbrev(date);
              const dayNum = date.getDate();

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setSelectedDate(date);
                    setSelectedSlot(null);
                  }}
                  className={`flex flex-col items-center justify-center min-w-[60px] h-[72px] rounded-xl border transition-all duration-300 snap-start cursor-pointer ${
                    isSelected
                      ? "bg-black border-black text-white shadow-md"
                      : "bg-neutral-50 border-neutral-200/60 text-neutral-800 hover:bg-neutral-100 hover:border-neutral-300"
                  }`}
                >
                  <span
                    className={`text-[8px] font-black tracking-wider uppercase mb-1 ${
                      isSelected ? "text-neutral-300" : "text-neutral-400"
                    }`}
                  >
                    {dayLabel}
                  </span>
                  <span className="text-xl font-black tracking-tight">{dayNum}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="space-y-5 pt-1">
        <div className="flex items-center justify-between border-t border-neutral-100 pt-5">
          <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-neutral-900">
            ¿A qué hora?
          </h3>

          <div className="flex bg-neutral-50 p-0.5 rounded-full border border-neutral-100">
            <button
              type="button"
              onClick={() => setTimeFilter("morning")}
              className={`rounded-full px-5 py-3 text-[8px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${
                timeFilter === "morning"
                  ? "bg-black text-white shadow-sm"
                  : "text-neutral-400 hover:text-neutral-900"
              }`}
            >
              Mañana
            </button>
            <button
              type="button"
              onClick={() => setTimeFilter("afternoon")}
              className={`rounded-full px-5 py-3 text-[8px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${
                timeFilter === "afternoon"
                  ? "bg-black text-white shadow-sm"
                  : "text-neutral-400 hover:text-neutral-900"
              }`}
            >
              Tarde
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2.5">
          {filteredSlots.map((slot, index) => {
            const isSelected = selectedSlot === slot.time;
            const { isAvailable, isOverlapping, isPast, exceedsClosing } = slot;

            let statusText = "";
            if (!isAvailable) {
              if (isPast) statusText = "Pasado";
              else if (isOverlapping) statusText = "";
              else if (exceedsClosing) statusText = "Cierre";
            }

            return (
              <button
                key={index}
                type="button"
                disabled={!isAvailable}
                onClick={() => setSelectedSlot(slot.time)}
                className={`group flex flex-col items-center justify-center py-3.5 px-2 rounded-xl border text-center transition-all duration-300 relative overflow-hidden select-none ${
                   isSelected
                     ? "bg-black border-black text-white shadow-md"
                     : isAvailable
                     ? "bg-neutral-50 border-neutral-200/50 hover:bg-neutral-100 hover:border-neutral-300 text-neutral-800 cursor-pointer active:scale-95"
                     : "bg-neutral-100/40 border-neutral-100 text-neutral-300 cursor-not-allowed"
                 }`}
              >
                {!isAvailable && (
                  <div
                    className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{
                      backgroundImage: 'repeating-linear-gradient(45deg, #000 0px, #000 1px, transparent 1px, transparent 8px)'
                    }}
                  />
                )}

                <span className={`text-[14px] font-black tracking-tight ${isSelected ? "text-white" : isAvailable ? "text-neutral-850" : "text-neutral-350"}`}>
                  {slot.time}
                </span>

                {statusText && (
                  <span className="text-[7px] font-black uppercase tracking-[0.1em] text-neutral-400 mt-0.5">
                    {statusText}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {filteredSlots.length === 0 && (
          <div className="text-center py-8 bg-neutral-50 rounded-2xl border border-neutral-100">
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
              No hay horarios disponibles en esta jornada
            </p>
          </div>
        )}
      </div>

      <form action="/agendar-cita/datos" method="GET" className="pt-5 border-t border-neutral-100">
        <input type="hidden" name="serviceId" value={serviceId} />
        <input type="hidden" name="date" value={selectedDateTimeISO} />

        <button
          type="submit"
          disabled={!selectedSlot}
          className={`w-full rounded-full py-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-300 shadow-lg active:scale-[0.97] ${
            selectedSlot
              ? "bg-neutral-900 text-white hover:bg-neutral-800 cursor-pointer"
              : "bg-neutral-100 text-neutral-400 border border-neutral-200/50 cursor-not-allowed shadow-none"
          }`}
        >
          {selectedSlot ? "Continuar a Datos Finales →" : "Selecciona Fecha y Hora"}
        </button>
      </form>
    </div>
  );
}
