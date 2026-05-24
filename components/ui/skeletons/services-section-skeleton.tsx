import Skeleton from "../skeleton";
import ServiceCardSkeleton from "./service-card-skeleton";

export default function ServicesSectionSkeleton() {
  return (
    <section className="py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center space-y-5 mb-16">
          <Skeleton className="h-6 w-36 rounded-full mx-auto" />
          <Skeleton className="h-12 w-80 mx-auto max-w-full" />
          <Skeleton className="h-5 w-96 mx-auto max-w-full" />
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <ServiceCardSkeleton />
          <ServiceCardSkeleton />
          <ServiceCardSkeleton />
        </div>
      </div>
    </section>
  );
}
