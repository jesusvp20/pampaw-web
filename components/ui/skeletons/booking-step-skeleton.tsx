import Skeleton from "../skeleton";

type BookingStepSkeletonProps = {
  step: number;
  totalSteps?: number;
};

export default function BookingStepSkeleton({ step, totalSteps = 4 }: BookingStepSkeletonProps) {
  return (
    <main className="min-h-screen bg-[#fbfaf8] pb-24 pt-28">
      <div className="mx-auto max-w-2xl px-6">
        {/* Stepper */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-12 flex-wrap">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className="flex items-center gap-1.5 sm:gap-2.5">
              <Skeleton className={`h-7 w-7 rounded-full ${i < step ? "" : ""}`} />
              {i < totalSteps - 1 && <div className="w-6 sm:w-10" />}
            </div>
          ))}
        </div>

        <div className="text-center mb-10 space-y-5">
          <Skeleton className="h-6 w-32 rounded-full mx-auto" />
          <Skeleton className="h-10 w-64 mx-auto max-w-full" />
          <Skeleton className="h-5 w-72 mx-auto max-w-full" />
        </div>

        <div className="rounded-2xl bg-white p-6 md:p-8 border border-neutral-200/60 shadow-sm space-y-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full rounded-xl" />
          ))}
          <Skeleton className="h-14 w-full rounded-full mt-6" />
        </div>
      </div>
    </main>
  );
}
