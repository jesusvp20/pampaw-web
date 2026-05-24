import Skeleton from "../skeleton";

export default function ServiceCardSkeleton() {
  return (
    <div className="relative rounded-[2.5rem] border border-neutral-200/60 bg-white p-10 overflow-hidden">
      <Skeleton className="absolute top-0 left-0 right-0 h-1.5 rounded-none" />
      <div className="flex flex-col h-full">
        <div className="flex items-start justify-between">
          <div className="space-y-3.5">
            <Skeleton className="h-6 w-28 rounded-full" />
            <Skeleton className="h-8 w-44" />
          </div>
          <Skeleton className="h-10 w-10 rounded-full shrink-0" />
        </div>
        <div className="mt-5 space-y-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-3/4" />
        </div>
        <div className="mt-8 flex items-center justify-between border-t border-neutral-100 pt-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-7 w-24" />
          </div>
          <Skeleton className="h-12 w-28 rounded-full" />
        </div>
      </div>
    </div>
  );
}
