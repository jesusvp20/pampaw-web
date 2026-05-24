import Skeleton from "@/components/ui/skeleton";

export default function LoginLoading() {
  return (
    <main className="min-h-screen bg-[#fbfaf8] flex items-center justify-center px-6 py-24">
      <div className="w-full max-w-md">
        <Skeleton className="h-4 w-32 mb-10" />
        <div className="text-center mb-10 space-y-5">
          <Skeleton className="h-16 w-16 rounded-2xl mx-auto" />
          <Skeleton className="h-9 w-48 mx-auto max-w-full" />
          <Skeleton className="h-5 w-64 mx-auto max-w-full" />
        </div>
        <div className="rounded-2xl bg-white p-6 md:p-8 border border-neutral-200/60 shadow-sm space-y-6">
          <Skeleton className="h-12 w-full rounded-xl" />
          <Skeleton className="h-12 w-full rounded-xl" />
          <Skeleton className="h-14 w-full rounded-full" />
        </div>
      </div>
    </main>
  );
}
