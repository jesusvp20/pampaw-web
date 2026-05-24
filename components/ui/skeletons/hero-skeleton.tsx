import Skeleton from "../skeleton";

export default function HeroSkeleton() {
  return (
    <section className="relative min-h-screen w-full bg-neutral-900 flex items-center">
      <div className="mx-auto max-w-7xl px-6 w-full">
        <div className="max-w-2xl space-y-8">
          <Skeleton className="h-7 w-48 rounded-full" />
          <div className="space-y-3">
            <Skeleton className="h-20 w-[500px] max-w-full" />
            <Skeleton className="h-20 w-[300px] max-w-full" />
          </div>
          <Skeleton className="h-6 w-96 max-w-full" />
          <div className="flex gap-5 pt-4">
            <Skeleton className="h-14 w-44 rounded-full" />
            <Skeleton className="h-14 w-36 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
