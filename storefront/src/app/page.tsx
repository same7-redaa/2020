import dynamic from "next/dynamic";
import Hero from "@/components/home/Hero";
import ClientsTickerSection from "@/components/home/ClientsTickerSection";

const TopMediaBuyersLeaderboard = dynamic(() => import("@/components/home/TopMediaBuyersLeaderboard"));
const ServicesSection = dynamic(() => import("@/components/home/ServicesSection"));
const PortfolioSection = dynamic(() => import("@/components/home/PortfolioSection"));
const CertificatesSection = dynamic(() => import("@/components/home/CertificatesSection"));
const StatsSection = dynamic(() => import("@/components/home/StatsSection"));
const Newsletter = dynamic(() => import("@/components/home/Newsletter"));
const SocialConnect = dynamic(() => import("@/components/home/SocialConnect"));

export default function Home() {
  return (
    <main className="flex-grow flex flex-col min-h-screen">
      <Hero />
      <ClientsTickerSection />
      <TopMediaBuyersLeaderboard />
      <ServicesSection />
      <PortfolioSection />
      <CertificatesSection />
      <StatsSection />
      <Newsletter />
      <SocialConnect />
    </main>
  );
}


