import LocalizedHeader from "@/components/layout/LocalizedHeader";
import HeroSection from "@/components/common/HeroSection";
import FeaturedProperties from "@/components/property/FeaturedProperties";
import VideoDestinationsSection from "@/components/common/VideoDestinationsSection";
import WhyChooseUsSection from "@/components/common/WhyChooseUsSection";
import ServicesSection from "@/components/common/ServicesSection";
import TestimonialsSection from "@/components/common/TestimonialsSection";
import FAQSection from "@/components/common/FAQSection";
import ExtraServicesSection from "@/components/common/ExtraServicesSection";
import NewsletterSection from "@/components/common/NewsletterSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <LocalizedHeader />
      <main>
        <HeroSection />
        <FeaturedProperties />
        <WhyChooseUsSection />
        <VideoDestinationsSection />
        <ServicesSection />
        <TestimonialsSection />
        <FAQSection />
        <ExtraServicesSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
