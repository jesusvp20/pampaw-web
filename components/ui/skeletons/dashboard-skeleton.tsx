import Skeleton from "../skeleton";

function AppointmentCardSkeleton() {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-neutral-200/60 bg-white p-5">
      <div className="flex items-center gap-4">
        <Skeleton className="h-14 w-14 rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
      <Skeleton className="h-5 w-5 rounded" />
    </div>
  );
}

export default function DashboardSkeleton() {
  return (
    <main className="min-h-screen bg-[#fbfaf8] pb-24">
      <div className="mx-auto max-w-2xl px-6 pt-28">
        {/* Header */}
        <div className="flex items-start justify-between mb-10">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-2xl" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
          <Skeleton className="h-9 w-20 rounded-full" />
        </div>

        <div className="space-y-10">
          {/* Mis Mascotas */}
          <section>
            <Skeleton className="h-4 w-32 mb-5" />
            <div className="rounded-2xl border border-neutral-200/60 bg-white p-6 shadow-sm space-y-4">
              <Skeleton className="h-14 w-full rounded-xl" />
              <div className="flex gap-3">
                <Skeleton className="h-12 flex-1 rounded-xl" />
                <Skeleton className="h-12 w-28 rounded-xl" />
              </div>
            </div>
          </section>

          {/* Próximas Citas */}
          <section>
            <Skeleton className="h-4 w-32 mb-5" />
            <div className="grid gap-4">
              <AppointmentCardSkeleton />
              <AppointmentCardSkeleton />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
