import Skeleton from "../skeleton";

function ProductCardSkeleton() {
  return (
    <div className="group rounded-2xl border border-neutral-200/60 bg-white overflow-hidden">
      <Skeleton className="aspect-square w-full rounded-none" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default function PetshopSkeleton() {
  return (
    <main className="min-h-screen bg-[#fbfaf8] pb-24 pt-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-14 space-y-5">
          <Skeleton className="h-6 w-32 rounded-full mx-auto" />
          <Skeleton className="h-10 w-64 mx-auto max-w-full" />
          <Skeleton className="h-5 w-80 mx-auto max-w-full" />
        </div>
        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </main>
  );
}
