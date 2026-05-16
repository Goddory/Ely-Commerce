import HeroBanner from "@/components/home/HeroBanner";
import TrustBanner from "@/components/home/TrustBanner";
import NewArrivals from "@/components/home/NewArrivals";
import Categories from "@/components/home/Categories";
import FeaturedCollection from "@/components/home/FeaturedCollection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-brand-bg">
      <HeroBanner />
      <TrustBanner />
      <NewArrivals />
      <Categories />
      <FeaturedCollection />
    </main>
  );
}
