import Header from "@/components/layout/Header";
import HeroSection from "@/components/common/HeroSection";
import FeaturedProperties from "@/components/property/FeaturedProperties";
import VideoDestinationsSection from "@/components/common/VideoDestinationsSection";
import WhyChooseUsSection from "@/components/common/WhyChooseUsSection";
import ServicesSection from "@/components/common/ServicesSection";
import TestimonialsSection from "@/components/common/TestimonialsSection";
import FAQSection from "@/components/common/FAQSection";
import ExtraServicesSection from "@/components/common/ExtraServicesSection";
import LiveFullySection from "@/components/common/LiveFullySection";
import NewsletterSection from "@/components/common/NewsletterSection";
import Footer from "@/components/layout/Footer";

// ISR settings
export const dynamic = 'force-dynamic';
export const revalidate = 300; // Revalidate every 5 minutes

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <FeaturedProperties />
        <WhyChooseUsSection />
        <VideoDestinationsSection />
        <ServicesSection />
        <TestimonialsSection />
        <FAQSection />
        <ExtraServicesSection />
        <LiveFullySection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
