import HeroSkeleton from "@/components/ui/skeletons/hero-skeleton";
import ServicesSectionSkeleton from "@/components/ui/skeletons/services-section-skeleton";

export default function LandingLoading() {
  return (
    <>
      <HeroSkeleton />
      <ServicesSectionSkeleton />
    </>
  );
}
